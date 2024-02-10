pipeline{
  agent{
    kubernetes {
      //PodTemplate Name: kube-agent
      defaultContainer 'jnlp'

      //label 'agent' //<< deprecated (replaced by inheritFrom)
      inheritFrom 'agent'

    }
  }

  stages{

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('DockerBuild') {
      steps {
        script {
          sh 'echo "Build Image..."'

          withCredentials([usernamePassword(
            credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD')]) {
              //sh 'docker build -t ${DOCKER_USERNAME}/node-dockgen:$BUILD_NUMBER .'
              dockerapp = docker.build("${DOCKER_USERNAME}/node-dockgen:$BUILD_NUMBER", ".")
          }

          
        }
      }
    }

    stage('DockerPush') {
      steps {
        script {
          sh 'echo "Push Image to Registry..."'

          withCredentials([usernamePassword(
            credentialsId: 'dockerhub',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD')]) {
              docker.withRegistry("https://registry.hub.docker.com", "dockerhub") {
              docker.app.push("$BUILD_NUMBER")
            }
          }          
        }
      }
    }

    stage('KubeDeploy') {
      steps {
        script {
          sh 'echo "Kubernetes deployment..."'
          //sh 'kubectl apply -f kubernetes/deployment.yaml'
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
