pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        script {
          sh 'docker build -t registry.example.com/node-dockgen:$BUILD_NUMBER .'
          sh 'docker push registry.example.com/node-dockgen:$BUILD_NUMBER'
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
    }
    failure {
      // Additional actions on build failure
      echo "Process has failed."
    }
  }
}
