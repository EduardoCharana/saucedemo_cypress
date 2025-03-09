const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: true,  
  screenshotsFolder: "cypress/screenshots",  
  video: true,  
  videosFolder: "cypress/videos",  

  e2e: {
    setupNodeEvents(on, config) {
       
    },
    baseUrl: "https://www.saucedemo.com", 
  },
});