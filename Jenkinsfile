pipeline{
    agent any 
    stages {
        stage('Clonar repositorio') {
            steps{
                git branch: 'main', credentialsId: 'git-jentkins', url: 'https://github.com/CamiloMadrigal12/micro-tw.git'
            }
        }
        stage('construir imagen de docker') {

        }
        stage('Desplegar contenedor de docker'){

        }
    }

    post{
        always{

        }
    }
}