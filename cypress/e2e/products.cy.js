import loginPage from "../support/pageObjects/loginPage.cy";

describe('template spec', () => {
    beforeEach(() => {
        cy.visit('/');
        loginPage.loginValid();
    });

    // Confirm the product name
    it('TC001 - Should display the correct products', () => {
        cy.get('.inventory_item_name').each(($el) => {
            cy.wrap($el).should('be.visible');  
            cy.wrap($el).invoke('text').should('not.be.empty');
        });

        cy.get('.inventory_item_name').eq(0).should('include.text', 'Sauce Labs');
        cy.get('.inventory_item_name').last().should('include.text', 'Test');
    });

    // Confirm the price format
    it('TC002 - Check if the price of each product is correct and properly formatted', () => {
        cy.get('.inventory_item_price').each(($el) => {
            cy.wrap($el).should('be.visible');
            cy.wrap($el).invoke('text').should('match', /^[\€|\$]\d+\.\d{2}$/);
        });
    });

    // Check if the image is the same on the homepage and product page
    it('TC003 - Confirm if the image on the homepage matches the image of the clicked product', () => {
        cy.get('.inventory_item_img').eq(0).should('be.visible');  
        cy.get('.inventory_item_img').eq(0).click();
        cy.get('img[alt="Sauce Labs Backpack"]').should('be.visible');
    });

    // Product description
    it('TC004 - Check if the product description is the same on the homepage and on the product page', () => {
        const expectedDescription = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
        
        cy.url().should('eql', 'https://www.saucedemo.com/inventory.html');
        cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]')
          .should('have.text', expectedDescription);
        
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click();
        cy.url().should('eql', 'https://www.saucedemo.com/inventory-item.html?id=4');
        cy.get('[data-test="inventory-item-desc"]').should('have.text', expectedDescription);
    });

    // Product price consistency
    it('TC005 - Check if the product price is the same on the homepage and on the product page', () => {
        const expectedPrice = '$29.99';  
        
        cy.url().should('eql', 'https://www.saucedemo.com/inventory.html');
        cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]')
          .should('have.text', expectedPrice);
        
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click();
        cy.url().should('eql', 'https://www.saucedemo.com/inventory-item.html?id=4');
        cy.get('[data-test="inventory-item-price"]').should('have.text', expectedPrice);
    });
});
