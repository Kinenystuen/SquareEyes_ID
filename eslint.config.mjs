import globals from "globals";
import pluginJs from "@eslint/js";
import pluginCypress from "eslint-plugin-cypress";
import pluginJest from "eslint-plugin-jest";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Define rules for the browser environment here if needed
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      cypress: pluginCypress,
      jest: pluginJest,
    },
    overrides: [
      {
        files: ["**/*.cy.js"],
        languageOptions: {
          globals: {
            ...globals.browser,
            ...globals.cypress,
          },
        },
        plugins: {
          cypress: pluginCypress,
        },
        rules: {
          "cypress/no-unnecessary-waiting": "off",
          "no-unused-vars": "off",
        },
        settings: {
          cypress: {
            version: 1,
          },
        },
      },
      {
        files: ["**/*.test.js"],
        plugins: {
          jest: pluginJest,
        },
        rules: {
          "jest/prefer-expect-assertions": "off",
        },
        settings: {
          jest: {
            version: 26,
          },
        },
      },
    ],
  },
];
