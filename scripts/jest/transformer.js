const path = require('path')
const babel = require('@babel/core')
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction')
const babelOptions = require('../babel/babel.test.config.js')

// Use require.resolve to be resilient to file moves, npm updates, etc
const pathToBabel = path.join(require.resolve('@babel/core'), '../', '../', 'package.json')
const pathToBabelrc = path.join(__dirname, '../babel/babel.test.config.js')

module.exports = {
  process(src, filePath) {
    if (!filePath.match(/\/third_party\//)) {
      const isTestFile = !!filePath.match(/\/__test__\//)
      const concatOptions = Object.assign(
        babelOptions,
        { filename: path.relative(process.cwd(), filePath) },
        isTestFile
          ? {
            plugins: babelOptions.plugins
          }
          : {}
      )
      const result = babel.transformSync(src, concatOptions)
      return result.code
    }
    return src
  },
  getCacheKey: createCacheKeyFunction([__filename, pathToBabel, pathToBabelrc])
}
