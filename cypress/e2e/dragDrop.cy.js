/// <reference types="cypress" />
describe('Cypress 101 assignment', () => {
  before(() => {
    cy.visit('/selenium-playground/input-form-demo')
  })

  it('drag and drop sliders', () => {
    cy.contains('Progress Bar & Sliders').click()
    cy.contains('Drag & Drop Sliders').click()
    cy.get('input[type="range"]').eq(2).invoke('val', '95').trigger('change').click({force:true});
    cy.get('input[type="range"]').eq(2).invoke("val", 95).trigger("click");
        cy.get("#rangeSuccess").invoke('val', 95).then((el) => {
            expect(el.text()).to.eq('95');
        });
  
})
})