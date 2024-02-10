pipeline{
  agent{
    kubernetes {
      //defaultContainer '$CONTAINER_TEMPLATE'
      label 'agent'
    }
  }

  stages{
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('DockerCheck'){
      steps {
        script {
          // Print the current PATH for debugging
          sh 'export PATH=$PATH:/usr/local/bin'
          sh 'echo $PATH'
          
          def dockerInstalled = sh(script: 'docker -v', returnStatus: true) == 0

          if (dockerInstalled) {
            echo 'Docker is installed'
          }
          else {
            error 'Docker is not found for some unknown reason.'
          }
        }
      }
    }

    stage('DockerBuild') {
      steps {
        script {     
          sh 'echo "Build Image..."'     
          //sh 'docker build -t alexmbarbosa/node-dockgen:$BUILD_NUMBER .'
          dockerapp = docker.build("alexmbarbosa/node-dockgen:$BUILD_NUMBER", ".")
        }
      }
    }

    stage('DockerPush') {
      steps {
        script {
          sh 'echo "Push Image to Registry..."'
          docker.withRegistry("https://registry.hub.docker.com", "dockerhub") {
            docker.app.push("$BUILD_NUMBER")
          }
        }
      }
    }

    stage('KubeDeploy') {
      steps {
        script {
          sh 'echo "Kubernetes deployment..."'
          sh 'kubectl apply -f kubernetes/deployment.yaml'
        }
      }
    }

  }
  
  post{
      always{
          echo "======== Pipeline Finished ========"
      }
      success{
          echo "======== Pipeline executed successfully! ========"
      }
      failure{
          echo "======== Pipeline execution failed ========"
      }
  }
}