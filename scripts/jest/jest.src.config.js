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
    // '<rootDir>/packages/laksa-account/test/?(*.)+(spec|test).js',
    '<rootDir>/packages/harmony-core/test/?(*.)+(spec|test).ts',
    // '<rootDir>/packages/laksa-core/test/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-core-contract/test/?(*.)+(spec|test).js'
    '<rootDir>/packages/harmony-crypto/test/?(*.)+(spec|test).ts',
    '<rootDir>/packages/harmony-contract/test/?(*.)+(spec|test).ts',
    // '<rootDir>/packages/laksa-core-messenger/test/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-core-provider/test/?(*.)+(spec|test).js',
    '<rootDir>/packages/harmony-transaction/test/?(*.)+(spec|test).ts',
    // '<rootDir>/packages/laksa-extend-keystore/test/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-providers-http/test/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-shared/test/?(*.)+(spec|test).js'
    '<rootDir>/packages/harmony-utils/test/?(*.)+(spec|test).ts',
    // '<rootDir>/packages/laksa-wallet/test/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa/test/?(*.)+(spec|test).js'
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock',
  },
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  collectCoverageFrom: [
    // 'packages/!(harmony-core)/src/**/*.ts',
    'packages/harmony-core/src/**/*.ts',
    'packages/harmony-utils/src/**/*.ts',
    'packages/harmony-crypto/src/**/*.ts',
    'packages/harmony-transaction/src/**/*.ts',
  ],
  timers: 'fake',
  setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
  setupTestFrameworkScriptFile:
    '<rootDir>/scripts/jest/jest.framework-setup.js',
  testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
  collectCoverage: true,
  automock: false,
};

module.exports = config;
