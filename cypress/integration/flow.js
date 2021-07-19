describe ('Flow', () => {

    beforeEach(() => {
        cy.setCookie('OCSESSID', '57920833597b90aa4681f4f0fe')
        cy.visit('/')
    });

  it ('Search works correctly and shows correct results', () => {
      
      //Enter text and search
      cy.get('.form-control')
          .invoke('attr', 'placeholder')
          .should('equal', 'Search');

        cy.get('.form-control')
          .type('Macbook{enter}')
          .should('have.value', 'Macbook');

        //Verifying that all elements are visible
        cy.get('ul.breadcrumb')
          .should('be.visible');

        cy.get('h1')
          .invoke('text')
          .should('contain', 'Search - Macbook');

        cy.get('#input-search')
          .should('have.value', 'Macbook');

        cy.get('select').eq(1)
          .should('be.visible');

        cy.get('div').contains('Search in subcategories')
          .should('be.visible');

        cy.get('div').contains('Search in product descriptions')
          .should('be.visible');

        cy.get('#button-search')
          .should('be.visible');

        cy.get('h2')
          .invoke('text')
          .should('equal', 'Products meeting the search criteria');

        cy.get('a').contains('Product Compare')
          .should('be.visible');

        cy.get('#input-sort')
          .should('be.visible');

        cy.get('#input-limit')
          .should('be.visible');

        cy.get('div.product-thumb').eq(0)
          .should('be.visible');

        cy.get('.button-group > button').eq(1)
          .should('be.visible');

        cy.get('.button-group > button').eq(2)
          .should('be.visible');      

        //Checking that list view details look ok
        cy.get('#list-view')
          .click(); 
          
        cy.get('div.product-thumb').eq(0)
          .should('be.visible');

        cy.get('.button-group > button').eq(1)
          .should('be.visible');

        cy.get('.button-group > button').eq(2)
          .should('be.visible');
  })

    it ('Adding product to the cart from product list works correctly', () => {
        cy.visit('/index.php?route=product/search&search=Macbook')
        
        //Adding product to the cart
        cy.get('.button-group > button').eq(0)
          .click();
              
        //Verifying that product is added to the cart
        cy.get('div').contains('Success')
          .should('be.visible');
      
        cy.get('.btn-inverse')
          .click();
      
        cy.get('tr').contains('MacBook')
          .should('be.visible');
      
        cy.get('tr').contains('x 1')
          .should('be.visible'); 

  })

  it ('Adding product to the cart from product details works correctly', () => {
        cy.visit('/index.php?route=product/product&product_id=43&search=macbook');
        
        //Verifying that product details look ok
        cy.get('ul.thumbnails')
          .should('be.visible');

        cy.get('a').contains('Description')
          .should('be.visible');

        cy.get('a').contains('Specification')
          .should('be.visible');

        cy.get('a').contains('Reviews')
          .should('be.visible');

        cy.get('button.btn.btn-default').eq(1)
          .trigger('mouseover');

        cy.get('.tooltip-inner').eq(0)
          .invoke('text')
          .should('equal', 'Add to Wish List');

        cy.get('button.btn.btn-default').eq(2)
          .trigger('mouseover');

        cy.get('.tooltip-inner').eq(1)
          .invoke('text')
          .should('equal', 'Compare this Product');

        cy.get('h1').contains('MacBook')
          .should('be.visible');

        //Adding more items to the cart
        cy.get('#input-quantity')
          .clear()
          .type('5');

        cy.intercept('GET', '/index.php?route=common/cart/info').as('cartInfo');

        cy.get('button').contains('Add to Cart')
          .click();

        cy.wait('@cartInfo');

        //Verifying that product is added to the cart
        cy.get('div').contains('Success')
          .should('be.visible');
      
        cy.get('.btn-inverse')
          .click();
      
        cy.get('tr').contains('MacBook')
          .should('be.visible');
      
        cy.get('tr').contains('x 6')
          .should('be.visible');
          
        //Going to the cart details
        cy.get('a').contains('View Cart')
          .click();

        //Not enough products
        cy.get('.alert').contains('Products marked with *** are not available in the desired quantity or not in stock!')
          .should('be.visible');

        //Verifying that all elements are visible
        cy.get('td').contains('Image')
          .should('be.visible');

        cy.get('td').contains('Product Name')
          .should('be.visible');
          
        cy.get('td').contains('Model')
          .should('be.visible');

        cy.get('td').contains('Quantity')
          .should('be.visible');

        cy.get('td').contains('Unit Price')
          .should('be.visible');

        cy.get('thead > tr > :nth-child(6)')
          .should('be.visible');

        cy.get('a').contains('Use Coupon Code')
          .click();

        //Shows after click
        cy.get('div').contains('Enter your coupon here')
          .should('be.visible');

        cy.get('a').contains('Use Coupon Code')
          .click();
          
        cy.get('a').contains('Use Gift Certificate ')
          .click();

        //Dissapears after click
        cy.get('div').contains('Enter your coupon here')
          .should('not.be.visible')

        //Shows after click
        cy.get('div').contains('Enter your gift certificate code here')
          .should('be.visible')
       
        //Removing products
        cy.get('i.fa.fa-times-circle')
          .click();
        
        //Adding new product into the cart
        cy.visit('/index.php?route=product/product&product_id=47');

        cy.get('#input-quantity')
          .clear()
          .type('5');

        cy.get('button').contains('Add to Cart')
          .click();

        //Going to the cart details
        cy.get('.btn-inverse')
          .click();

        cy.intercept('GET', '/index.php?route=common/cart/info').as('cartLoad');

        cy.wait('@cartLoad');

        cy.get('a').contains('View Cart')
          .click();

        //Change quantity
        cy.get('input.form-control').eq(1)
          .clear()
          .type('5');

        cy.get('i.fa.fa-refresh')
          .click();

        cy.get('.alert').contains('Success')
          .should('be.visible');

        cy.get('a').contains('Checkout')
          .click({force: true});

        cy.url()
          .should('contain', '/index.php?route=checkout/checkout');

  })

  it ('Checkout works correctly', () => {
        cy.visit('/index.php?route=checkout/checkout');

        cy.get('label').contains('I want to use a new address')
          .click();

        cy.get('#input-payment-firstname')
          .type('TEST');

        cy.get('#input-payment-lastname')
          .type('TEST');

        cy.get('#input-payment-address-1')
          .type('TEST');

        cy.get('#input-payment-city')
          .type('TEST');

        cy.get('#input-payment-postcode')
          .type('TEST');

        cy.get('#input-payment-country')
          .select('Croatia');
          
        cy.get('#input-payment-zone')
          .select('Splitsko-dalmatinska');

        cy.get('#button-payment-address')
          .click();

        cy.get('#button-shipping-address')
          .click();

        cy.get('#button-shipping-method')
          .click();

        cy.get('[type="checkbox"]')
          .click();

        cy.get('#button-payment-method')
          .click();

        cy.get('#button-confirm')
          .click();

        cy.url()
          .should('contain', '/index.php?route=checkout/success');

        //Verifying that order has been placed
        cy.get('h1').contains('Your order has been placed!')
          .should('be.visible');

        cy.get('.btn-inverse')
          .click();

        cy.get('ul.dropdown-menu.pull-right')
          .invoke('text')
          .should('contain', 'Your shopping cart is empty!');

        cy.get('.pull-right > .btn')
          .click();

        cy.url()
          .should('contain', '/index.php?route=common/home')
  })

});