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

            // Send Email After Every Build
            emailext(
                to: 'rajabhijeetanand@gmail.com',
                subject: "Playwright Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                mimeType: 'text/html',
                body: """
                    <h2>Playwright Automation Execution Report</h2>

                    <table border="1" cellpadding="6" cellspacing="0">
                        <tr><td><b>Project</b></td><td>${env.JOB_NAME}</td></tr>
                        <tr><td><b>Build Number</b></td><td>${env.BUILD_NUMBER}</td></tr>
                        <tr><td><b>Status</b></td><td>${currentBuild.currentResult}</td></tr>
                        <tr><td><b>Environment</b></td><td>${params.ENV}</td></tr>
                        <tr><td><b>Browser</b></td><td>${params.BROWSER}</td></tr>
                    </table>

                    <br>

                    <a href="${env.BUILD_URL}Playwright_HTML_Report/">
                        View Playwright HTML Report
                    </a>

                    <br><br>

                    <a href="${env.BUILD_URL}artifact/playwright-report/index.html">
                        Download Report
                    </a>

                    <br><br>

                    Jenkins Build:
                    <a href="${env.BUILD_URL}">
                        ${env.BUILD_URL}
                    </a>
                """
            )

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
