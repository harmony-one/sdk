const path = require('path');
const UglifyJs = require('uglifyjs-webpack-plugin');
const packagesSettings = require('./scripts/packagesList');

function createBatchConfig(list) {
  return list.map((l) => {
    const entryBase = {};
    entryBase[l.name] = [`./packages/${l.dest}/dist/index.js`];

    const batchBaseConfig = {
      entry: entryBase,
      mode: 'production',
      module: {
        rules: [
          {
            test: /\.js$/,
            // use: {
            //   loader: 'babel-loader',
            // },
          },
        ],
      },
      devtool: 'source-map',
      resolve: {
        symlinks: true,
        extensions: ['.js'],
      },
    };

    const batchClientConfig = {
      ...batchBaseConfig,
      optimization: {
        minimizer: [
          new UglifyJs({
            uglifyOptions: {
              compress: true,
              mangle: true,
              toplevel: false,
              output: {
                beautify: false,
                comments: false,
              },
            },
            parallel: true,
            sourceMap: true,
          }),
        ],
      },
      output: {
        libraryTarget: 'umd',
        library: `${l.name}`,
        filename: '[name].browser.js',
        path: path.join(__dirname, 'dist'),
      },
    };

    return [batchBaseConfig, batchClientConfig];
  });
}

function reduceDimension(arr) {
  return Array.prototype.concat.apply([], arr);
}

const batch = reduceDimension(createBatchConfig(packagesSettings));

module.exports = batch;
