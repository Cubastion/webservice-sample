def registry = "harbor.cubastion.net"
def targetImage = params.targetImage
def build_num = params.build_number
def harborCred = params.harbor_cred

pipeline {
    agent any
    options {
        timeout(time: 59, unit: 'MINUTES')
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    cleanWs()
                    deleteDir()
                    checkout scm
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build("${registry}/${targetImage}:${build_num}")
                }
            }
        }

        stage("Push Image") {
            steps {
                retry(count: 2) {
                    script {
                        docker.withRegistry("https://${registry}", "${harborCred}") {
                            dockerImage.push()
                        }
                    }
                }
            }
        }

        stage("Cleanup") {
            steps {
                script {
                    always {
                        script {
                            try {
                                    sh "docker rmi ${registry}/${targetImage}:${build_num}"
                            } catch (Exception e) {
                                echo "Docker image doesn't exist or already deleted"
                            }
                        }
                        cleanWs()
                        deleteDir()
                    }
                }
            }
        }
    }

    post {
           always {
               script {
                   try {
                        sh "docker rmi ${registry}/${targetImage}:${build_num}"
                  } catch (Exception e) {
                    echo "Docker image doesn't exist or already deleted"
                  }
              }
               cleanWs()
           }
   }
}