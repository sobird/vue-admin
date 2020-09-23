module.exports = {
  root: true,
  env: {
    node: true
  },
  //extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-trailing-spaces": ["error", { ignoreComments: true }]
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    parser: "babel-eslint"
  }
};
