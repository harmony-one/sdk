const baseConfig = require('./jest.src.config');
module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@harmony-js/(.*)$': '<rootDir>/packages/harmony-$1/src/index.ts',
  },
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testMatch: ['<rootDir>/e2e/src/?(*.)+(spec|test|e2e).ts'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  collectCoverageFrom: [
    // 'packages/!(harmony-core)/src/**/*.ts',
    'packages/harmony-core/src/**/*.ts',
    'packages/harmony-utils/src/**/*.ts',
    'packages/harmony-crypto/src/**/*.ts',
    'packages/harmony-transaction/src/**/*.ts',
  ],
};
