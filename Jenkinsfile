pipeline {
    agent any
    parameters {
        booleanParam(name: 'WITH_ADMIN_BUILD', defaultValue: true, description: '')
    }

    tools {nodejs "nodejs"}

    stages {
        stage('node setup') { 
            steps {
                sh 'npm install --force' 
            }
        }
        stage('build-with-admin'){
            when{
                expression {
                    return params.WITH_ADMIN_BUILD;
                }
            }
            steps{
                sh 'npm run build-admin'
            }
        }
        stage('build-without-admin'){
            when{
                expression {
                    return !params.WITH_ADMIN_BUILD;
                }
            }
            steps{
                sh 'npm run build --prod -c=no-admin'
            }
        }
        stage("archive distro"){
            steps{
                // create zip
                //sh "zip -r distro-achieve.zip /distro"
                script{
                     zip zipFile: 'distro-achieve.zip', archive: false, dir: 'dist'
                     uploadGithubReleaseAsset(
                        credentialId: 'GITHUB_TOKEN',
                        repository: 'immyemperor/cicd_angular',
                        tagName: 'v1.${env.BUILD_NUMBER}', 
                        uploadAssets: [
                            [filePath: 'distro-achieve.zip']
                        ]
                    )
                }
            }
        }
    }
    post { 
         always { 
            cleanWs()
        }
    }
}