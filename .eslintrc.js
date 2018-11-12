let config = {
    root: true,
    env: {
      browser: true,
      es6: true
    },
    extends: [
      // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
      // "standard",
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      "plugin:vue/essential",
      // https://github.com/prettier/eslint-plugin-prettier#readme
      "plugin:prettier/recommended"
    ],
    parserOptions: {
      parser: "babel-eslint",
      ecmaVersion: 6,
    },
    plugins: [
      "vue"
    ],
    rules: {
      // prettier标记的地方抛出错误信息，eslint进行autofix
      "prettier/prettier": "error",
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
};

module.exports = config
