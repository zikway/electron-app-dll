const { defineConfig } = require("@soybeanjs/eslint-config");
// require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      "vue/multi-word-component-names": [
        "warn",
        {
          ignores: ["index", "App", "[id]", "[url]"]
        }
      ],
      "vue/component-name-in-template-casing": [
        "warn",
        "PascalCase",
        {
          registeredComponentsOnly: false,
          ignores: ["/^icon-/"]
        }
      ],
      "unocss/order-attributify": "off",
      "class-methods-use-this": "off",
      "n/prefer-global/process": "off", // 取消 require
      "arrow-parens": ["error", "always"],
      "vue/script-indent": [
        "error",
        2,
        {
          baseIndent: 1
        }
      ],
      quotes: ["error", "double"],
      "vue/html-quotes": ["error", "double"],
      semi: "off",
      "@typescript-eslint/consistent-type-imports": "off"
    }
  },
  {
    ignores: ["node_modules/*", "output/*", "/public/*", "patches/*", "*.yaml", "./*.js", "*.md", ".*/*", ".*"]
  }
);
