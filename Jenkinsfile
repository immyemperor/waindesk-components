pipeline {
    agent any
    parameters {
        choice(name:"BUILD_TOOL_TYPE", choices: ["STANDALONE", "CDO", "E2E"])
        stringParam(name: 'BRANCH', defaultValue: true, description: '')
        switch(params.BUILD_TOOL_TYPE) {
            case "CDO":
                return booleanParam(name: 'CDO_BUILD', defaultValue: true, description: '') 
            break
            case "STANDALONE":
                return booleanParam(name: 'WITH_ADMIN_BUILD', defaultValue: true, description: '')
            break
            case "E2E":
                return booleanParam(name: 'E2E', defaultValue: true, description: '')
            break
        }        

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
                    return params.BUILD_TOOL_TYPE == "STANDALONE" && params.WITH_ADMIN_BUILD;
                }
            }
            steps{
                sh 'npm run build-admin'
            }
        }
        stage('build-without-admin'){
            when{
                expression {
                    return params.BUILD_TOOL_TYPE == "STANDALONE" && !params.WITH_ADMIN_BUILD;
                }
            }
            steps{
                sh 'npm run build --prod -c=no-admin'
            }
        }
        stage('cdo-build'){
            when{
                expression {
                    return params.BUILD_TOOL_TYPE == "CDO" && params.WITH_ADMIN_BUILD;
                }
            }
            steps{
                sh 'npm run build-admin'
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