/// <reference types="cypress" />

describe('Cypress 101 assignment', () => {
  before(()=>{
    cy.visit('/selenium-playground/input-form-demo')
})

  it('drag and drop sliders', () => {
      cy.contains('Progress Bar & Sliders').click()
      cy.contains('Drag & Drop Sliders').click()
      cy.get('input[type=range]').invoke('val', '95')
      cy.get('#rangeSuccess').invoke('val', '95').trigger('change')
      cy.get('#rangeSuccess').should('have.text', '95')

  })
})