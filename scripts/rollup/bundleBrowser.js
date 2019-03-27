import * as path from 'path';
import camelCase from 'camelcase';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import json from 'rollup-plugin-json';
import typescript2 from 'rollup-plugin-typescript2';
import ts from 'typescript';
import packages from '../packages';
import browserConfig from '../babel/babel.browser.config.js';
import { getKeys } from './getDependencies';

function bundles() {
  return packages.map((p) => {
    const external = getKeys(p);
    const externalSetting = getKeys(p).length > 0 ? { external } : {};
    const normal = {
      input: `packages/${p}/src/index.ts`,
      output: {
        file: `packages/${p}/lib/index.js`,
        format: 'umd',
        name: camelCase(p),
      },
      plugins: [
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
        babel(browserConfig),
        commonjs(),
        json(),
        license({
          banner: `Test Banner`,
        }),
      ],
    };
    return Object.assign(normal, externalSetting);
  });
}

export default bundles();
