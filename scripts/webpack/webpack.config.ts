import path from 'path';
// tslint:disable-next-line: no-implicit-dependencies
import TerserPlugin from 'terser-webpack-plugin';
// tslint:disable-next-line: no-implicit-dependencies
import { Configuration } from 'webpack';

// // tslint:disable-next-line: no-implicit-dependencies
// import {createVariants} from 'parallel-webpack';

import { packageList, PackageItem } from './packagesForWP';

function createBatchConfig(list: PackageItem[]) {
  return list.map((l: PackageItem) => {
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
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: 6,
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
        filename: `${l.name}.browser.js`,
        // filename: '[name].browser.js',
        path: path.join(__dirname, '../../', 'dist'),
      },
    };

    return [batchBaseConfig, batchClientConfig];
  });
}

function reduceDimension(arr: any[]) {
  return Array.prototype.concat.apply([], arr);
}

const batch: Configuration = reduceDimension(createBatchConfig(packageList));

// tslint:disable-next-line: no-default-export
export default batch;
