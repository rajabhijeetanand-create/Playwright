pipeline {

    agent any

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

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Execute Playwright Tests') {
            steps {

                bat """
                    set ENV=%ENV%
                    npx playwright test --project=%BROWSER%
                """

            }
        }

    }

    post {

        always {

            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

            archiveArtifacts artifacts: 'test-results/**', fingerprint: true, allowEmptyArchive: true

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