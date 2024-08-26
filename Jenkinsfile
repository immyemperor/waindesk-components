pipeline {
    agent any
    parameters {
        booleanParam(name: 'WITH_ADMIN_BUILD', defaultValue: true, description: '')
    }

    tools {nodejs "node22"}

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
                     //sh "zip -r distro-achieve-${env.BUILD_NUMBER}.zip /dist"
                     zip zipFile: "distro-achieve-${env.BUILD_NUMBER}.zip", archive: false, dir: 'dist'
                     sh "ls -a"
                     echo "releasing..."
                     createGitHubRelease(
                        credentialId: 'GITHUB_TOKEN',
                        tag: "v1.${env.BUILD_NUMBER}",
                        repository: 'immyemperor/waindesk-components',
                        bodyText:" v1.${env.BUILD_NUMBER} Release",
                        commitish: "${env.GIT_COMMIT}"
                    )
                    echo "uploading zip to github..."
                     uploadGithubReleaseAsset(
                        credentialId: 'GITHUB_TOKEN',
                        repository: 'immyemperor/waindesk-components',
                        tagName: "v1.${env.BUILD_NUMBER}", 
                        uploadAssets: [
                            [filePath: "${env.WORKSPACE}/distro-achieve-${env.BUILD_NUMBER}.zip"]
                        ]
                    )
                }
            }
        }
    }
    // post { 
    //      always { 
    //         cleanWs()
    //     }
    // }
}