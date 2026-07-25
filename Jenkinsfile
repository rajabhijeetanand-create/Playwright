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
            allowMissing: true,
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