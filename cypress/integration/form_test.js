describe('Form test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })


const firstNameInput = () => cy.get('input[name=first_name]')
const lastNameInput = () => cy.get('input[name=last_name]')
const emailInput = () => cy.get('input[name=email]')
const passwordInput = () => cy.get('input[name=password]')
const roleSelection = () => cy.get('select[name=role]')
const checkbox = () => cy.get('input[name=terms]')
const submitBtn = () => cy.get('button[id="submitBtn"]')
const errorMessage = () => cy.get('div[id="firstNameError"]')

    it('First test', () => {
        firstNameInput()
            .type('Amy')
            .should('have.value', 'Amy')
        lastNameInput()
            .type('Lam')
            .should('have.value', 'Lam')
        emailInput()
            .type('amy@gmail.com')
        passwordInput()
            .type('12345678')
        roleSelection()
            .select('Software Developer')
        checkbox()
            .check()
        submitBtn()
            .click()
    })

    // Check for form validation if an input is left empty

    it('Second test', () => {
        firstNameInput()
            .type('Amy')
        lastNameInput()
            .type('Lam')
            .should('have.value', 'Lam')
        emailInput()
            .type('amy@gmail.com')
        passwordInput()
            .type('12345678')
        roleSelection()
            .select('Software Developer')
        checkbox()
            .check()
        firstNameInput()
            .clear()
        cy.contains('Username is required').should('exist')

    })

})