module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'newline-before-return': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^@nestjs/', '^@?\\w'],
              [
                '^(@Database)(/.*|$)',
                '^(@Filters)(/.*|$)',
                '^(@Guards)(/.*|$)',
                '^(@Interfaces)(/.*|$)',
                '^(@Interceptors)(/.*|$)',
                '^(@Decorators)(/.*|$)',
                '^(@Entities)(/.*|$)',
                '^(@Enums)(/.*|$)',
                '^(@Validations)(/.*|$)',
                '^(@Modules)(/.*|$)',
                '^(@Models)(/.*|$)',
                '^(@DatabaseModels)(/.*|$)',
                '^(@Utils)(/.*|$)',
                '^(@Constants)(/.*|$)',
                '^(@Shared)(/.*|$)',
                '^(@Templates)(/.*|$)',
                '^(@SESParams)(/.*|$)',
              ],
              [
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
              ],
            ],
          },
        ],
      },
    },
  ],
};
