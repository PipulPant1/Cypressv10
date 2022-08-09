const { defineConfig } = require('cypress')
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    baseUrl: 'https://www.lambdatest.com',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        }
    }),
    on('before:browser:launch', (browser = {}, launchOptions) => {
      prepareAudit(launchOptions)
    })
  
    on('task', {
      lighthouse: lighthouse(), // calling the function is important
      async lighthouse(allOptions) {
        let txt
        // calling the function is important
        const lighthouseTask = lighthouse((lighthouseReport) => {
          let lighthouseReportHeader="==========================Lighthouse Report=============================\n"
          let lighthouseReportFooter="==========================End Of Report=============================\n"

          let lighthouseScoreText = ''
          let lighthouseResult = lighthouseReport?.lhr?.categories
          let lighthousePerformance =
            'Performance: ' + lighthouseResult?.performance?.score + '\n'
          let lighthouseAccessibility =
            'Accessibility: ' + lighthouseResult?.accessibility?.score + '\n'
          let lighthouseBestPractices =
            'Best Practices: ' +
            lighthouseResult?.['best-practices']?.score +
            '\n'
          let lighthouseSEO = 'SEO: ' + lighthouseResult?.seo?.score + '\n'
          lighthouseScoreText =
            lighthouseReportHeader+
            lighthousePerformance +
            lighthouseAccessibility +
            lighthouseBestPractices +
            lighthouseSEO +
            lighthouseReportFooter
  
          console.log(lighthouseScoreText)
          txt = lighthouseScoreText
        })
  
        const report = await lighthouseTask(allOptions)
        // insert the text into the report returned the test
        report.txt = txt
        return report
      },
    })
    }
  }
})