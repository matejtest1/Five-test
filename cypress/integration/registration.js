describe ('Registration', () => {

    beforeEach(() => {
        cy.visit('/index.php?route=account/register')
    });

    it ('Go to registration page and register user successfully', () => {
        
        //Navigating to the registration page

        cy.visit('/');

        cy.get('#top-links')
            .should('be.visible');

        cy.get('.caret')	
            .click();

        cy.get('a').contains('Register')
            .click();

        cy.url()
            .should('contain', '/index.php?route=account/register');

        //Verifying that all elements are visible

        cy.get('ul.breadcrumb')
            .should('be.visible');

        cy.get('h1').contains('Register Account')
            .should('be.visible');

        cy.get('a').contains('login page')
            .should('have.attr', 'href', 'https://demo.opencart.com/index.php?route=account/login');

        cy.get('fieldset').contains('Your Personal Details')
            .should('be.visible');

        cy.get('fieldset').contains('Your Password')
            .should('be.visible');

        cy.get('fieldset').contains('Newsletter')
            .should('be.visible');

        cy.get('#column-right')
            .should('be.visible');

        //Generating random email
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}@mail.com`
        
        //Insert data into the fields and register user
        cy.get('label[for="input-firstname"]')
            .invoke('text')
            .should('equal', 'First Name');
        
        cy.get('#input-firstname')
            .type('New')
            .should('have.value', 'New');

        cy.get('label[for="input-lastname"]')
            .invoke('text')
            .should('equal', 'Last Name');

        cy.get('#input-lastname')
            .type('User')
            .should('have.value', 'User');

        cy.get('label[for="input-email"]')
            .invoke('text')
            .should('equal', 'E-Mail');

        cy.get('#input-email')
            .type(testname)
            .should('have.value', testname);

        cy.get('label[for="input-telephone"]')
            .invoke('text')
            .should('equal', 'Telephone');

        cy.get('#input-telephone')
            .type('0981231111')
            .should('have.value', '0981231111');   
            
        cy.get('label[for="input-password"]')
            .invoke('text')
            .should('equal', 'Password');
            
        cy.get('#input-password')
            .type('1234')
            .should('have.value', '1234'); 
            
        cy.get('label[for="input-confirm"]')
            .invoke('text')
            .should('equal', 'Password Confirm');
            
        cy.get('#input-confirm')
            .type('1234')
            .should('have.value', '1234'); 

        cy.get('label').contains('Subscribe')
            .should('be.visible');

        cy.get('[type="checkbox"]')
            .click();
            
        cy.get('input').contains('Continue')
            .click();
        
        //Verifying that account has been created
        cy.get('h1')
            .invoke('text')
            .should('contain', 'Your Account Has Been Created!');
  })

  it ('Try to register without entering any data', () => {
        
        cy.get('input').contains('Continue')
            .click();

        //Checking that validation messages are shown and have correct text
        cy.get('.alert')
            .invoke('text')
            .should('equal', ' Warning: You must agree to the Privacy Policy!');

        cy.get('div.text-danger').eq(0)
            .invoke('text')
            .should('equal', 'First Name must be between 1 and 32 characters!');

        cy.get('div.text-danger').eq(1)
            .invoke('text')
            .should('equal', 'Last Name must be between 1 and 32 characters!');

        cy.get('div.text-danger').eq(2)
            .invoke('text')
            .should('equal', 'E-Mail Address does not appear to be valid!');

        cy.get('div.text-danger').eq(3)
            .invoke('text')
            .should('equal', 'Telephone must be between 3 and 32 characters!');

        cy.get('div.text-danger').eq(4)
            .invoke('text')
            .should('equal', 'Password must be between 4 and 20 characters!');
    })

    it ('Try to register by using too litle characters for telephone and password fields', () => {

        //Generating random email address
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}@mail.com`

        //Entering data into the fields
        cy.get('#input-firstname')
            .type('New')
            .should('have.value', 'New');

        cy.get('#input-lastname')
            .type('User')
            .should('have.value', 'User');

        cy.get('#input-email')
            .type(testname)
            .should('have.value', testname);

        cy.get('#input-telephone')
            .type('09')
            .should('have.value', '09');   
        
        cy.get('#input-password')
            .type('12')
            .should('have.value', '12'); 
        
        cy.get('#input-confirm')
            .type('12')
            .should('have.value', '12'); 

        cy.get('[type="checkbox"]')
            .click();
        
        cy.get('input').contains('Continue')
            .click();

        //Checking that validation messages are shown and have correct text
        cy.get('div.text-danger').eq(0)
            .invoke('text')
            .should('equal', 'Telephone must be between 3 and 32 characters!');

        cy.get('div.text-danger').eq(1)
            .invoke('text')
            .should('equal', 'Password must be between 4 and 20 characters!');

    })


    it ('Try to register by using too many characters for all fields', () => {
        
        //Generating random email address
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}@mail.com`

        //Entering data into the fields
        cy.get('#input-firstname')
            .type('NewNewNewNewNewNewNewNewNewNewNewNewNewNew')
            .should('have.value', 'NewNewNewNewNewNewNewNewNewNewNewNewNewNew');

        cy.get('#input-lastname')
            .type('UserUserUserUserUserUserUserUserUserUserUser')
            .should('have.value', 'UserUserUserUserUserUserUserUserUserUserUser');

        cy.get('#input-email')
            .type(testname)
            .should('have.value', testname);

        cy.get('#input-telephone')
            .type('123456789123456789123456789123456789')
            .should('have.value', '123456789123456789123456789123456789');   
        
        cy.get('#input-password')
            .type('1234567891234567891212')
            .should('have.value', '1234567891234567891212'); 
        
        cy.get('#input-confirm')
            .type('1234567891234567891212')
            .should('have.value', '1234567891234567891212'); 

        cy.get('[type="checkbox"]')
            .click();
        
        cy.get('input').contains('Continue')
            .click();

        //Checking that validation messages are shown and have correct text
        cy.get('div.text-danger').eq(0)
            .invoke('text')
            .should('equal', 'First Name must be between 1 and 32 characters!');

        cy.get('div.text-danger').eq(1)
            .invoke('text')
            .should('equal', 'Last Name must be between 1 and 32 characters!');

        cy.get('div.text-danger').eq(2)
            .invoke('text')
            .should('equal', 'Telephone must be between 3 and 32 characters!');

        //This one will fail, there is a bug
        cy.get('div.text-danger').eq(3)
            .invoke('text')
            .should('equal', 'Password must be between 4 and 20 characters!');

    })

    it ('Try to register by using invalid email address', () => {

        //Entering data into the fields
        cy.get('#input-firstname')
            .type('New')
            .should('have.value', 'New');

        cy.get('#input-lastname')
            .type('User')
            .should('have.value', 'User');

        cy.get('#input-email')
            .type('aa')
            .should('have.value', 'aa');

        cy.get('#input-telephone')
            .type('0981957766')
            .should('have.value', '0981957766');   
        
        cy.get('#input-password')
            .type('1234')
            .should('have.value', '1234'); 
        
        cy.get('#input-confirm')
            .type('1234')
            .should('have.value', '1234'); 

        cy.get('[type="checkbox"]')
            .click();
        
        cy.get('input').contains('Continue')
            .click();
        
        //Verifying that account has not been created
        cy.url().should('contain', '/index.php?route=account/register');
    })

    it ('Try to register by using existing email address', () => {

        //Entering data into the fields
        cy.get('#input-firstname')
            .type('New')
            .should('have.value', 'New');

        cy.get('#input-lastname')
            .type('User')
            .should('have.value', 'User');

        cy.get('#input-email')
            .type('matejtesting@gmail.com')
            .should('have.value', 'matejtesting@gmail.com');

        cy.get('#input-telephone')
            .type('0981957766')
            .should('have.value', '0981957766');   
        
        cy.get('#input-password')
            .type('1234')
            .should('have.value', '1234'); 
        
        cy.get('#input-confirm')
            .type('1234')
            .should('have.value', '1234'); 

        cy.get('[type="checkbox"]')
            .click();
        
        cy.get('input').contains('Continue')
            .click();

        //Verifying that correct message is shown
        cy.get('.alert')
            .invoke('text')
            .should('equal', ' Warning: E-Mail Address is already registered!');
    })
});