podTemplate(
  cloud: 'kubernetes', 
  containers: [
    containerTemplate(
      image: 'alexmbarbosa/jenkins-agent:latest', 
      livenessProbe: containerLivenessProbe(
        execArgs: '',
        failureThreshold: 0,
        initialDelaySeconds: 0,
        periodSeconds: 0,
        successThreshold: 0,
        timeoutSeconds: 0),
      name: 'kube-agent',
      resourceLimitCpu: '',
      resourceLimitEphemeralStorage: '',
      resourceLimitMemory: '',
      resourceRequestCpu: '',
      resourceRequestEphemeralStorage: '',
      resourceRequestMemory: '',
      workingDir: '/home/jenkins')],
  inheritFrom: 'kube-agent', label: 'kube-agent', name: 'kube-agent', namespace: 'devops-tools') {

    // some block
    node('kube-agent') {
        stage('Initialization') {
            echo 'Running initialization steps...'
        }

        stage('Build') {
            echo 'Building...'
        }

        stage('Testing') {
            echo 'Running tests...'
        }
        
        // Add more stages or steps as needed

        stage('Cleanup') {
            echo 'Performing cleanup...'
        }
    }

    // Add more steps or blocks outside the 'node' block as needed
    echo 'Outside of the Kubernetes node block...'
}
