module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    "shared-node-browser": true,
    node: true,
    es2022: true,
  },
  overrides: [
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
