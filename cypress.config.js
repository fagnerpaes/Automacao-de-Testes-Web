const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    blockHosts: [
      "*googlesyndication.com",
      "*doubleclick.net",
      "*googleadservices.com",
      "*google-analytics.com",
      "*googletagmanager.com",
      "*adtrafficquality.google",
      "*fundingchoicesmessages.google.com",
    ],
    setupNodeEvents(on, config) {
      // o reporter entra aqui na Etapa 6
    },
  },
});