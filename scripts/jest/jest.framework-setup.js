const { matchersWithOptions } = require('jest-json-schema')

expect.extend(matchersWithOptions({ allErrors: true }))
jest.setTimeout(180000)
