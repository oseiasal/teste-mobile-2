pipeline {
    agent any
  
    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'master', url: 'https://github.com/oseiasal/teste-mobile-2.git'
            }
        }
        
         stage('Instalar dependências') {
            steps {
              bat 'npm install'
            }
        }
        
         stage('Executar testes') {
            steps {
                bat 'npx wdio run wdio.conf.js'
            }
        }
    }
}
