/// <reference types="cypress" />
import { A11YOptions } from "../fixtures/accessibilityOptions"
import { lighthouseConfig, threshold } from "../fixtures/lighthouseOptions"
import { terminalLog } from "../support/e2e"

describe('Cypress 101 assignment', () => {
    before(() => {
        cy.visit('/selenium-playground/input-form-demo')
        cy.viewport('samsung-note9')
        cy.contains('Input Forms').click().should('be.visible')
        cy.contains('Input Form Submit').click({ force: true })
        cy.injectAxe()

    })

    it('verify form’s accessibility standard using cypress axe', () => {
        // This is used for accessibility testing
        cy.checkA11y('.loginform', A11YOptions, terminalLog)
    })

    it('verify performance metrics of the submission page', () => {
        cy.fixture('formData').then((userFixture) => {
            cy.get('#name').type(userFixture['name'])
            cy.get('#inputEmail4').type(userFixture['email'])
            cy.get('#inputPassword4').type(userFixture['password'])
            cy.get('#company').type(userFixture['company'])
            cy.get('#websitename').type(userFixture['websiteName'])
            cy.get('#inputCity').type(userFixture['city'])
            cy.get('#inputAddress1').type(userFixture['primaryAddress'])
            cy.get('#inputAddress2').type(userFixture['secondaryAddress'])
            cy.get('#inputState').type(userFixture['state'])
            cy.get('#inputZip').type(userFixture['zipCode'])
          })

        cy.get('.btn').click()
        cy.lighthouse(threshold, lighthouseConfig).then((report) => {
            const { errors, results, txt } = report
            // our custom code in the plugins file has summarized the report
            cy.log(report.txt)
        })
        cy.get('.success-msg').should('have.text','Thanks for contacting us, we will get back to you shortly.')

    })


})