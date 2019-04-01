import * as path from 'path';
import camelCase from 'camelcase';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import webpack from 'webpack';
import ts from 'typescript';
import packages from '../packages';
import browserConfig from '../babel/babel.browser.config.js';
import { getKeys } from './getDependencies';

const rootPath = path.resolve(__dirname, '../..');
const includesPath = path.join(rootPath, 'includes');
const packagesPath = path.join(rootPath, 'packages');

const project = {
  preprocess: [
    {
      name: 'elliptic',
      path: path.resolve(__dirname, '../node_modules/elliptic'),
      entry: 'lib/elliptic.js',
      outDir: path.join(includesPath, 'elliptic'),
    },
  ],
};
function preProcess(project) {
  const modules = project.preprocess.map((mod) => {
    return new Promise((resolve, reject) => {
      const compiler = webpack({
        entry: {
          [mod.name]: path.join(mod.path, mod.entry),
        },
        output: {
          filename: '[name].js',
          library: mod.name,
          libraryTarget: 'commonjs2',
          path: mod.outDir,
        },
        mode: 'production',
        optimization: {
          minimize: false,
        },
      });

      compiler.run((err, stats) => {
        if (err) {
          reject(err);
        } else {
          // logPreProcess(
          //   `Successfully preprocessed ${Object.keys(
          //     stats.compilation.assets,
          //   ).join(' ,')}`,
          // );
          resolve(stats);
        }
      });
    });
  });

  return Promise.all(modules);
}

async function bundles() {
  await preProcess(project);

  return packages.map((p) => {
    const external = getKeys(p);
    const externalSetting = getKeys(p).length > 0 ? { external } : {};
    const externalObject = external.reduce((g, pkg) => {
      g[`${pkg}`] = pkg.startsWith('@harmony') ? pkg : camelCase(pkg);
      return g;
    }, {});
    const normal = {
      input: `packages/${p}/src/index.ts`,
      plugins: [
        alias({
          elliptic: path.resolve(
            __dirname,
            '../',
            'includes/elliptic/elliptic.js',
          ),
        }),
        resolve({
          browser: true,
          jsnext: true,
          preferBuiltins: true,
        }),
        babel(browserConfig),
        globals(),
        commonjs(),
        json(),
        typescript2({
          typescript: ts, // ensure we're using the same typescript (3.x) for rollup as for regular builds etc
          tsconfigOverride: {
            module: 'esnext',
            stripInternal: true,
            emitDeclarationOnly: false,
            composite: false,
            declaration: false,
            declarationMap: false,
            sourceMap: true,
          },
        }),
        license({
          banner: `Test Banner`,
        }),
      ],
      output: {
        file: `packages/${p}/dist/index.js`,
        exports: 'named',
        format: 'umd',
        sourcemap: true,
        name: camelCase(p),
        globals: {
          ...externalObject,
          tslib: 'tslib',
        },
      },
    };
    // return normal;
    return Object.assign(normal, externalSetting);
  });
}

export default bundles();
