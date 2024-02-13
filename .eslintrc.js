module.exports = {
  parser: '@typescript-eslint/parser', // For TypeScript projects
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier to display Prettier errors as ESLint errors
  ],
  plugins: ['@typescript-eslint'
  ], // For TypeScript projects
  rules: {
    // Add your project-specific ESLint rules here
  },
};
