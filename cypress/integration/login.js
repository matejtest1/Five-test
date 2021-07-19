describe ('Login', () => {

    beforeEach(() => {
        cy.visit('/index.php?route=account/login')
    });

    it ('Go to login page and log in into the system successfully', () => {
        
        //Navigating to the login page
        cy.visit('/');

        cy.get('#top-links')
            .should('be.visible');

        cy.get('.caret')	
            .click();

        cy.get('a').contains('Login')
            .click();

        cy.url()
            .should('contain', '/index.php?route=account/login');

        //Verifying that all elements are visible
        cy.get('ul.breadcrumb')
            .should('be.visible');

        cy.get('div').contains('New Customer')
            .should('be.visible');

        cy.get('a').contains('Continue')
            .should('have.attr', 'href', 'https://demo.opencart.com/index.php?route=account/register');

        cy.get('div').contains('Returning Customer')
            .should('be.visible');

        cy.get('label[for="input-email"]')
            .invoke('text')
            .should('equal', 'E-Mail Address');

        cy.get('label[for="input-password"]')
            .invoke('text')
            .should('equal', 'Password');

        cy.get('a').contains('Forgotten Password')
            .should('have.attr', 'href', 'https://demo.opencart.com/index.php?route=account/forgotten');

        //Insert data into the fields and log in
        cy.get('#input-email')
            .type('matejtesting@gmail.com')
            .should('have.value', 'matejtesting@gmail.com');

        cy.get('#input-password')
            .type('1234')
            .should('have.value', '1234');

        cy.get('input').contains('Login')
            .click();

        cy.url()
            .should('equal', 'https://demo.opencart.com/index.php?route=account/account');

        //Logout
        cy.get('a.list-group-item').contains('Logout')
            .should('have.attr', 'href', 'https://demo.opencart.com/index.php?route=account/logout')
            .click();

        //Verifying that user is logged out
        cy.get('h1').contains('Account Logout')
            .should('be.visible');

        cy.get('a').contains('Continue')
            .should('have.attr', 'href', 'https://demo.opencart.com/index.php?route=common/home')
            .click();

        cy.url()
            .should('equal', 'https://demo.opencart.com/index.php?route=common/home');

        cy.get('#top-links')
            .should('be.visible');

        cy.get('.caret')	
            .click();

        cy.get('a').contains('Login')
            .should('be.visible');
    })

    it ('Go to login page and try to log in with correct email and incorrect password', () => {
        
        //Enter data in the fields
        cy.get('#input-email')
            .type('matejtesting@gmail.com')
            .should('have.value', 'matejtesting@gmail.com');

        cy.get('#input-password')
            .type('12345')
            .should('have.value', '12345');

        cy.get('input').contains('Login')
            .click();

        //Verifying user is not logged in
        cy.get('div').contains('Warning')
            .should('be.visible');

        cy.url()
            .should('equal', 'https://demo.opencart.com/index.php?route=account/login');
    })


});