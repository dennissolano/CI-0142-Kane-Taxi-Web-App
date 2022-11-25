const {defineConfig} = require('cypress');
const {verifyDownloadTasks} = require('cy-verify-downloads');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
    },
    baseUrl: 'https://kane-web.web.app/',
    testingEmail: 'kanecontroladora@mailinator.com',
    testingPassword: 'asdf1234',
    defaultCommandTimeout: 7000,
    trashAssetsBeforeRuns: true
  }
});
