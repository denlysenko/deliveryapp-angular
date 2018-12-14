module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/jest/setup-jest.ts',
  moduleNameMapper: {
    '@base/(.*)': '<rootDir>/src/app/base/$1',
    '@ui/(.*)': '<rootDir>/src/app/ui/$1',
    '@common/(.*)': '<rootDir>/src/app/common/$1',
    '@core/(.*)': '<rootDir>/src/app/modules/core/$1',
    '@app-shell/(.*)': '<rootDir>/src/app/modules/app-shell/$1',
    '@auth/(.*)': '<rootDir>/src/app/modules/auth/$1',
    '~/(.*)': '<rootDir>/src/$1'
  }
};
