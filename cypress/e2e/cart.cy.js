import loginPage from "../support/pageObjects/loginPage.cy";
import checkoutPage from "../support/pageObjects/cartPage.cy";

describe('Verify cart functionalities', () => {
    beforeEach(() => {
        cy.visit('/');
        loginPage.loginValid();
    });

    it('TC001 - Add Product to Cart - Check the cart counter', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
        cy.get('.cart_list').should('be.visible').and('contain', 'Sauce Labs Backpack');
    });

    it('TC002 - Verify selected product matches cart page', () => {
        cy.get('.inventory_item_name').first().invoke('text').then((productName) => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            cy.get('[data-test="shopping-cart-link"]').click();
            cy.get('[data-test="inventory-item-name"]').first().should('have.text', productName);
        });
    });

    it('TC003 - Remove a product from the cart ', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
        cy.get('.cart_item .inventory_item_name').should('have.text', 'Sauce Labs Backpack');
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('.cart_item').should('not.exist');
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    });

    it('TC004 - Ensure the cart counter updates correctly when multiple products are present and when one is removed at home page', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '2');
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');
    });

    it('TC005 - Ensure the cart counter updates correctly when multiple products are present and when one is removed at checkout page', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '2')

        cy.get('[data-test="shopping-cart-link"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '2')
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1')
    });




    it('TC006 - Checkout with valid information', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
        cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information');
        cy.get('[data-test="firstName"]').type('Jonnhy');
        cy.get('[data-test="lastName"]').type('Deep');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');
        cy.get('[data-test="title"]').should('contain', 'Checkout: Overview');
    });

    it('TC007 - Validate product price', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('.inventory_item_price').should('be.visible').and('have.text', '$29.99');
    });

    it('TC008 - Validate payment method', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('.summary_value_label').contains('SauceCard #31337').should('be.visible');
    });

    it('TC009 - Validate shipping method', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('.summary_value_label').contains('Free Pony Express Delivery!').should('be.visible');
    });

    it('TC010 - Validate total purchase calculations', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('.summary_subtotal_label').should('contain', 'Item total: $29.99');
        cy.get('.summary_tax_label').should('contain', 'Tax: $2.40');
        cy.get('.summary_total_label').should('contain', 'Total: $32.39');
    });

    it('TC011 - Validate element visibility', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('.cart_quantity').should('be.visible');
        cy.get('.inventory_item_name').should('be.visible');
        cy.get('.summary_info').should('be.visible');
        cy.get('[data-test="finish"]').should('be.visible');
    });

    it('TC012 - Validate order completion', () => {
        checkoutPage.checkoutValidaInfoAndProductInc();
        cy.get('[data-test="finish"]').click();
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('be.visible').and('have.text', 'Thank you for your order!');
    });
});