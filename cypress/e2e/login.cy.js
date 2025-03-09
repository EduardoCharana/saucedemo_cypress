import loginPage from "../support/pageObjects/loginPage.cy";
import { loginElements } from "../support/elements/loginElemnts.cy";

describe('Login Features', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('TC001 - Login with valid credentials', () => {
        loginPage.loginValid();
        cy.get('div.inventory_container').should('be.visible');
        cy.get('div.inventory_container').should('include.text', 'Sauce Labs');
        cy.url().should('eql', 'https://www.saucedemo.com/inventory.html');
    });

    it('TC002 - Login with invalid username', () => {
        loginPage.loginInvalidUserName();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Username and password do not match any user in this service');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC003 - Login with invalid password', () => {
        loginPage.loginInvalidPasswd();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Username and password do not match any user in this service');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC004 - Login with blank credentials', () => {
        loginPage.loginBlank();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Username is required');
        cy.get(loginElements.login.userName).should('have.value', '');
        cy.get(loginElements.login.passwd).should('have.value', '');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC005 - Login with valid username but no password', () => {
        loginPage.loginBlankPasswd();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Password is required');
        cy.url().should('eql', 'https://www.saucedemo.com/');
        cy.get(loginElements.login.passwd).should('have.value', '');
    });

    it('TC006 - Login with valid credentials but typo in username', () => {
        loginPage.loginValidTypo();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Username and password do not match any user in this service');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC007 - Login button should not be disabled', () => {
        loginPage.loginDisableButton();
        cy.get(loginElements.login.userName).should('have.value', '');
        cy.get(loginElements.login.passwd).should('have.value', '');
        cy.get('input#login-button').should('not.be.disabled');
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Username is required');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC008 - Login with blocked user', () => {
        loginPage.loginBlokedUser();
        cy.get(loginElements.error.errorMessage).should('contain', 'Epic sadface: Sorry, this user has been locked out.');
        cy.url().should('eql', 'https://www.saucedemo.com/');
    });

    it('TC009 - Performance glitch user', () => {
        loginPage.PerformanceGlitchUser();
        const start = performance.now();
        cy.get('div.inventory_container').should('be.visible');
        cy.window().then(() => {
            const end = performance.now();
            const time = end - start;
            cy.log(`Login time: ${time}ms`);
            expect(time).to.be.lessThan(10000);
        });
    });
});
