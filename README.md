# Automated UI Tests with Cypress on Sauce Demo

## What is it?

This repository was created for the Automated UI Testing Bootcamp.

## Technologies Used

Cypress

Node.js v22.4.0

##Documentation

Website to be tested: [Consult saucedemo]([https://serverest.dev/](https://www.saucedemo.com/))

##How to Install the Environment

First: Install Node.js on your computer [download here](https://nodejs.org/en/download/package-manager)

Secound: Install package manager [download here](https://docs.cypress.io/app/get-started/install-cypress#Package-Manager)

```
npm install cypress --save-dev
```
How to Run the Tests

Via Cypress UI

Open Cypress with the command:
```
npx cypress open
```
Choose the browser and run the desired tests.

Via Command Line (Headless Mode)

To run all tests automatically without opening the Cypress UI:
```
npx cypress run
```
Test Report

To generate reports with Mochawesome, install the dependency:
```
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```
Run the tests and generate the report:
```
npx cypress run --reporter mochawesome
```
The reports will be in the cypress/reports folder and can be opened in a browser.

Contact

email: ed.charana.pt@gmail.com
