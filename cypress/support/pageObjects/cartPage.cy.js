import { checkoutElements } from "../elements/cartElemts.cy";

class checkoutPage{
    checkoutValidaInfoAndProductInc(){
        cy.get(checkoutElements.addProductCart).click()
        cy.get(checkoutElements.getCartPage).click()
        cy.get(checkoutElements.getCheckoutPage).click()
        cy.get(checkoutElements.firstNameCheckout).type('jonnhy')
        cy.get(checkoutElements.LastNameCheckout).type('deep')
        cy.get(checkoutElements.zipCodeCheckout).type('1234')
        cy.get(checkoutElements.continueCheckoutBtn).click()
    }

}

export default new checkoutPage