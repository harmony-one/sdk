const baseConfig = require('./jest.src.config');
module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@harmony-js/(.*)$': '<rootDir>/packages/harmony-$1/src/index.ts',
  },
  setupTestFrameworkScriptFile:
    '<rootDir>/scripts/jest/jest.framework-setup.js',
  testMatch: ['<rootDir>/e2e/src/?(*.)+(spec|test|e2e).ts'],
};
