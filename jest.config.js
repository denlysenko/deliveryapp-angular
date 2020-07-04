module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json'
    }
  },
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/setup-jest.ts'],
  moduleNameMapper: {
    '@base/(.*)': '<rootDir>/src/app/base/$1',
    '@ui/(.*)': '<rootDir>/src/app/ui/$1',
    '@common/(.*)': '<rootDir>/src/app/common/$1',
    '@core/(.*)': '<rootDir>/src/app/modules/core/$1',
    '@app-shell/(.*)': '<rootDir>/src/app/modules/app-shell/$1',
    '@auth/(.*)': '<rootDir>/src/app/modules/auth/$1',
    '@orders/(.*)': '<rootDir>/src/app/modules/orders/$1',
    '@users/(.*)': '<rootDir>/src/app/modules/users/$1',
    '@payments/(.*)': '<rootDir>/src/app/modules/payments/$1',
    '@user-view/(.*)': '<rootDir>/src/app/modules/user-view/$1',
    '@messages/(.*)': '<rootDir>/src/app/modules/messages/$1',
    '~/(.*)': '<rootDir>/src/$1'
  }
};
