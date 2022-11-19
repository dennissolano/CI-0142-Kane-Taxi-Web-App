const {defineConfig} = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://kane-web.web.app/',
    testingEmail: 'kanecontroladora@mailinator.com',
    testingPassword: 'asdf1234'
  }
});
