const OFF = 0;
const WARN = 1;
const ERROR = 2;

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'no-console': isProd ? ERROR : OFF,
    'no-debugger': isProd ? ERROR : OFF,
    'no-alert': isProd ? WARN : OFF,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
