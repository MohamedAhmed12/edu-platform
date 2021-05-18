module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "plugin:vue-i18n/recommended",
  ],
  // required to lint *.vue files
  plugins: ["vue"],

  globals: {
    $nuxt: true,
  },
  // add your custom rules here
  rules: {
    "prettier/prettier": "error",

    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue-i18n/no-dynamic-keys": "error",
    "vue-i18n/no-unused-keys": [
      "error",
      {
        src: "./src",
        extensions: [".js", ".vue"],
      },
    ],
    "vue-i18n/no-missing-keys": "error",
    "vue-i18n/no-raw-text": 0,
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "fetch",
          "asyncData",
          "data",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
        alphabetical: true,
      },
    ],
  },
  settings: {
    "vue-i18n": {
      localeDir: "./src/locales/*.json",
    },
  },
};
