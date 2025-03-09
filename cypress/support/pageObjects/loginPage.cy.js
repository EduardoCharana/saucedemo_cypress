import { loginElements } from "../elements/loginElemnts.cy";

class loginPage {
    loginValid(){
        cy.get(loginElements.login.userName).type('standard_user')
        cy.get(loginElements.login.passwd).type('secret_sauce')
        cy.get(loginElements.login.btn).click()

    }

    loginInvalidUserName(){
        cy.get(loginElements.login.userName).type('wrongUserName')
        cy.get(loginElements.login.passwd).type('secret_sauce')
        cy.get(loginElements.login.btn).click()

    }

    loginInvalidPasswd(){
        cy.get(loginElements.login.userName).type('standard_user')
        cy.get(loginElements.login.passwd).type('wrongpasswd')
        cy.get(loginElements.login.btn).click()

    }

    loginBlank(){
        cy.get(loginElements.login.userName).clear()
        cy.get(loginElements.login.passwd).clear()
        cy.get(loginElements.login.btn).click()
    }

    loginBlankPasswd(){
        cy.get(loginElements.login.userName).type('standard_user')
        cy.get(loginElements.login.passwd).clear()
        cy.get(loginElements.login.btn).click()
    }

    loginValidTypo(){
        cy.get(loginElements.login.userName).type('Standard_user')
        cy.get(loginElements.login.passwd).type('secret_sauce')
        cy.get(loginElements.login.btn).click()
    }

    loginDisableButton(){
        cy.get(loginElements.login.userName).clear()
        cy.get(loginElements.login.passwd).clear()
        cy.get(loginElements.login.btn).click()
    }

    loginBlokedUser(){
        cy.get(loginElements.login.userName).type('locked_out_user')
        cy.get(loginElements.login.passwd).type('secret_sauce')
        cy.get(loginElements.login.btn).click()
    }

    PerformanceGlitchUser(){
        cy.get(loginElements.login.userName).type('performance_glitch_user')
        cy.get(loginElements.login.passwd).type('secret_sauce')
        cy.get(loginElements.login.btn).click()
    }

}

export default new loginPage