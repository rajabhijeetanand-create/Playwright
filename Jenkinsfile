pipeline {

    agent any

    tools {
        nodejs 'NodeJS20'
    }

    parameters {

        choice(
            name: 'ENV',
            choices: ['qa', 'dev'],
            description: 'Select Environment'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select Browser'
        )

    }

    environment {
        APP_USERNAME = credentials('APP_USERNAME')
        APP_PASSWORD = credentials('APP_PASSWORD')
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat "npx playwright install ${params.BROWSER}"
            }
        }

        stage('Execute Playwright Tests') {
            steps {
                withEnv(["ENV=${params.ENV}"]) {
                    bat "npx playwright test --project=${params.BROWSER}"
                }
            }
        }

    }

    post {

        always {

            archiveArtifacts(
                artifacts: 'playwright-report/**',
                fingerprint: true
            )

            archiveArtifacts(
                artifacts: 'test-results/**',
                fingerprint: true,
                allowEmptyArchive: true
            )

            // Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            cleanWs()

        }

        success {
            echo '========================================='
            echo 'Playwright Tests Executed Successfully'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'Playwright Test Execution Failed'
            echo '========================================='
        }

    }

}
