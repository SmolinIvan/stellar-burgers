import { defineConfig } from "cypress";
require('dotenv').config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    env: {
      apiUrl: process.env.BURGER_API_URL
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
