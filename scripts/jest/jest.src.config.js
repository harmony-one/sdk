const config = {
  transform: {
    '^.+\\.(t|j)s$': require.resolve('./transformer.js')
  },
  testMatch: [
    '<rootDir>/packages/**/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-account/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-blockchain/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-core/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-core-contract/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-core-crypto/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-core-messenger/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-core-provider/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-core-transaction/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-extend-keystore/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-providers-http/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-shared/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa-utils/__test__/?(*.)+(spec|test).js',
    // '<rootDir>/packages/laksa-wallet/__test__/?(*.)+(spec|test).js'
    // '<rootDir>/packages/laksa/__test__/?(*.)+(spec|test).js'
  ],
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cross-fetch': 'jest-fetch-mock'
  },
  testURL: 'http://localhost',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  collectCoverageFrom: [
    'packages/!(laksa-hd-wallet)/src/**/*.js'
    // 'packages/!(laksa-core-crypto)/src/*.js'
  ],
  timers: 'fake',
  setupFiles: ['<rootDir>/scripts/jest/jest.setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/scripts/jest/jest.framework-setup.js',
  testEnvironment: process.env.NODE_ENV === 'development' ? 'node' : 'jsdom',
  collectCoverage: true,
  automock: false
}

module.exports = config
