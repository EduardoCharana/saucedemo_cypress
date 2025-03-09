import loginPage from "../support/pageObjects/loginPage.cy";
import { loginElements } from "../support/elements/loginElemnts.cy";
import { NavigationElements } from "../support/elements/navigationUIElemnts.cy";

describe('Navigation UI', () => {
    beforeEach(() => {
        cy.visit('/');
        loginPage.loginValid();
    });

    it('TC001 - Validate redirection after login', () => {
        cy.get('div.inventory_container').should('be.visible');
        cy.get('div.inventory_container').should('include.text', 'Sauce Labs');
        cy.url().should('eql', 'https://www.saucedemo.com/inventory.html');
    });

    it('TC002 - Validate the visibility of the home page elements', () => {
        cy.url().should('eql', 'https://www.saucedemo.com/inventory.html');
        cy.get('div.inventory_container').should('be.visible');
        cy.get('[data-test="title"]').contains('Products');
        cy.get('[data-test="shopping-cart-link"]').should('be.visible');
        cy.get('#react-burger-menu-btn').click();
        cy.get('.bm-item-list').should('be.visible');

        const options = ['All Items', 'About', 'Logout', 'Reset App State'];
        cy.get('.bm-item-list').within(() => {
            options.forEach(option => {
                cy.contains(option).should('be.visible');
            });
        });

        const sortOptions = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];
        cy.get('.select_container')
            .should('be.visible')  
            .invoke('text')  
            .should('not.be.empty');  

        cy.get('.select_container select option')
            .should('have.length', sortOptions.length)  
            .each(($option, index) => {
                expect($option.text().trim()).to.equal(sortOptions[index]);  
            });

        cy.get('[data-test="inventory-list"] .inventory_item').should('exist');
        cy.get('[data-test="inventory-list"] .inventory_item')
            .should('have.length.at.least', 1);

        cy.get('.shopping_cart_link')
            .should('exist')
            .should('be.visible');
    });

    it('TC004 - Should sort the products by name (A-Z)', () => {
        cy.get('.inventory_list').should('be.visible');
        cy.get('.product_sort_container').select('az');
        cy.get('.inventory_item_name').then(items => {
            const nomes = [...items].map(item => item.innerText);
            const nomesOrdenados = [...nomes].sort();
            expect(nomes).to.deep.equal(nomesOrdenados);
        });
    });

    it('TC005 - Should sort the products by name (Z-A)', () => {
        cy.get('.inventory_list').should('be.visible');
        cy.get('.product_sort_container').select('za');
        cy.get('.inventory_item_name').then(items => {
            const nomes = [...items].map(item => item.innerText);
            const nomesOrdenados = [...nomes].sort().reverse();
            expect(nomes).to.deep.equal(nomesOrdenados);
        });
    });

    it('TC006 - Should sort the products by price (low to high)', () => {
        cy.get('.inventory_list').should('be.visible');
        cy.get('.product_sort_container').select('lohi');
        cy.get('.inventory_item_price').then(items => {
            const precos = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
            const precosOrdenados = [...precos].sort((a, b) => a - b);
            expect(precos).to.deep.equal(precosOrdenados);
        });
    });

    it('TC007 - Should sort the products by price (high to low)', () => {
        cy.get('.inventory_list').should('be.visible');
        cy.get('.product_sort_container').select('hilo');
        cy.get('.inventory_item_price').then(items => {
            const precos = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
            const precosOrdenados = [...precos].sort((a, b) => b - a);
            expect(precos).to.deep.equal(precosOrdenados);
        });
    });

    it('TC008 - Should display the correct products', () => {
        cy.get('.inventory_item_name').each(($el) => {
            cy.wrap($el).should('be.visible');  
            cy.wrap($el).invoke('text').should('not.be.empty');  
            cy.get('.inventory_item_name').eq(0).should('include.text', 'Sauce Labs');
            cy.get('.inventory_item_name').last().should('include.text', 'Test');
        });
    });

    it('TC009 - BurgerBTN Navigation', () => {
        cy.get(NavigationElements.homePage.buergerBtn).click();
        cy.get('.bm-item-list').should('be.visible');
        cy.get('.bm-item-list').contains('All Items').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    });

    it('TC010 - Should navigate me to the shopping cart', () => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/cart.html');
        cy.get('[data-test="title"]').should('have.text', 'Your Cart');
        cy.get('[data-test="checkout"]').should('be.visible');
    });

    it('TC011 - Logout', () => {
        cy.get(NavigationElements.homePage.buergerBtn).click();
        cy.get('.bm-item-list').should('be.visible');
        cy.get('.bm-item-list').contains('Logout').click();
        cy.url().should('include', 'https://www.saucedemo.com');
    });
});
