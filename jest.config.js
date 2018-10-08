module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/jest/setup-jest.ts',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@common/(.*)': '<rootDir>/src/app/common/$1',
    '@auth/(.*)': '<rootDir>/src/app/auth/$1',
    '~/(.*)': '<rootDir>/src/$1'
  }
};
