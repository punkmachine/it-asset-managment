/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  "ignorePatterns": ["*.spec.ts", "/src/vue-features/composables/*.ts"],
  'extends': [
    // @todo: рекомендуемые настройки для ts
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // plugins: {},
  rules: {
    // душные правила по коду
    'max-depth': ['error', 4], // максимально количество вложенных блоков видимости
    'max-lines': ['error', {
      max: 300,
      skipComments: true,
    }], // максимальное количество строк в файле
    'max-lines-per-function': ['error', {
      max: 12,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: false,
    }], // максимальное количество строк в функции
    'max-nested-callbacks': ['error', 4], // максимальная глубина вложенных вызовов функций
    'id-length': ['error', {
      min: 1,
      max: 24,
      properties: 'never',
    }], // минимальные и максимальные длины переменных и функций
  },
  // globals: {},
}
