pipeline {
  //agent any
  agent {
    kubernetes {
      label 'kube-agent'
      defaultContainer 'jnlp'
    }
  }

  environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') 
        DOCKER_IMAGE_NAME = "alexmbarbosa/node-dockgen:$BUILD_NUMBER"
  }


  stages {
    stage('Checkout') {
      steps {
        checkout scm
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
