pipeline {
  //agent any
  agent {
    kubernetes {
      defaultContainer 'jnlp'
  //    //label 'kube-agent'
    }
  }

  //environment {
  //      DOCKERHUB_CREDENTIALS = credentials('dockerhub') 
  //      DOCKER_IMAGE_NAME = "alexmbarbosa/node-dockgen:$BUILD_NUMBER"
  //}


  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Docker'){
      steps {
        script {
          // Print the current PATH for debugging
          sh 'echo $PATH'
          sh 'ls -lrt /usr/local/bin'
          
          def dockerInstalled = sh(script: 'command -v docker', returnStatus: true) == 0

          if (dockerInstalled) {
            echo 'Docker is installed'
            // Your further Docker-related steps or commands can be added here
          }
          else {
            error 'Docker is not installed. Please install Docker before running this pipeline.'
          }          
        }
      }
    }

    stage('Build') {
      steps {
        script {          
          //sh 'docker build -t alexmbarbosa/node-dockgen:$BUILD_NUMBER .'
          dockerapp = docker.build("alexmbarbosa/node-dockgen:$BUILD_NUMBER", '-f ./src/Dockerfile ./src')
        }
      }
    }

    stage('Push') {
      steps {
        script {
          //withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')])
          //sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
          //sh 'docker push alexmbarbosa/node-dockgen:$BUILD_NUMBER'
          
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            docker.app.push("$BUILD_NUMBER")
          
          }
        }
      }
    }

    stage('KubeDeploy') {
      steps {
        script {
          // Deploy to Kubernetes using kubectl
          sh 'kubectl apply -f kubernetes/deployment.yaml'
        }
      }
    }
  }

  post {
    success {
      // Cleanup actions
      echo "Successful deployment."
    }
    failure {
      // Additional actions on build failure
      echo "Process has failed."
    }
  }
}
