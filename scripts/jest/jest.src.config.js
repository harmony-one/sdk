const config = {
  transform: {
    // '^.+\\.(t|j)s$': require.resolve('./transformer.js')
    '^.+\\.(t)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tsconfig.test.json',
    },
  },
  testMatch: [
    // '<rootDir>/packages/**/test/?(*.)+(spec|test).js',
    '<rootDir>/packages/harmony-core/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-account/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-network/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-crypto/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-contract/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-transaction/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-staking/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-utils/test/?(*.)+(spec|test).ts',
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
  },
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts', '<rootDir>/e2e'],
  collectCoverageFrom: [
    // 'packages/!(harmony-core)/src/**/*.ts',
    'packages/harmony-core/src/**/*.ts',
    'packages/harmony-utils/src/**/*.ts',
    'packages/harmony-crypto/src/**/*.ts',
    'packages/harmony-transaction/src/**/*.ts',
    'packages/harmony-staking/src/**/*.ts',
    'packages/harmony-contract/src/**/*.ts',
  ],
  // timers: 'fake',
  setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
  collectCoverage: true,
  automock: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

module.exports = config;
