import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': ['warn'], // Предупреждение о неиспользуемых переменных
      quotes: ['error', 'single'], // Использовать одинарные кавычки
      //'prettier/prettier': 'error', // Проверка форматирования с Prettier
    },
    plugins: {
      prettier: eslintPluginPrettier, // Добавляем плагин Prettier
    },
  },
];
