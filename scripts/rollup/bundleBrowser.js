import * as path from 'path';
import * as fs from 'fs';
import * as rollup from 'rollup';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import typescript2 from 'rollup-plugin-typescript2';
import camelCase from 'camelcase';

import ts from 'typescript';
import packages from '../packages';
import browserConfig from '../babel/babel.browser.config.js';
import { getKeys } from './getDependencies';
import {
  rootPath,
  includesPath,
  packagesPath,
  projects,
  preProcessFunc,
  preProcessProjects,
} from '../projects';

async function bundles() {
  await preProcessFunc(preProcessProjects);

  for (const pkg of projects) {
    const externals = projects
      .filter((p) => p.name !== pkg.name)
      .map((p) => p.scopedName);

    const base = {
      input: path.join(pkg.src, 'index.ts'),
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
        // babel(browserConfig),
        globals(),
        commonjs(),
        json(),
        typescript2({
          typescript: ts, // ensure we're using the same typescript (3.x) for rollup as for regular builds etc
          tsconfig: `${packagesPath}/${p.name}/tsconfig.json`,
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
      external: projects
        .filter((p) => p.name !== pkg.name)
        .map((p) => p.scopedName)
        .concat(['cross-fetch']),
    };

    const pkgBundler = await rollup.rollup(base);

    await pkgBundler.write({
      file: pkg.esm,
      name: pkg.globalName,
      format: 'esm',
      sourcemap: true,
    });
    await bundle.write({
      file: pkg.umd,
      exports: 'named',
      name: pkg.globalName,
      globals: {
        ...projects.reduce((g, pkg) => {
          g[pkg.scopedName] = pkg.globalName;
          return g;
        }, {}),
        tslib: 'tslib',
      },
      format: 'umd',
      sourcemap: true,
    });
  }

  // return projects.map((p) => {
  //   const external = getKeys(p.name).filter(
  //     (pkg) => !pkg.startsWith('@harmony'),
  //   );
  //   const externalSetting = getKeys(p.name).length > 0 ? { external } : {};
  //   const externalObject = external.reduce((g, pkg) => {
  //     g[`${pkg}`] = !pkg.startsWith('@harmony')
  //       ? pkg
  //       : `@harmony/${p.name.replace('harmony-', '')}`;
  //     return g;
  //   }, {});

  //   const normal = {
  //     input: `packages/${p.name}/src/index.ts`,
  //     plugins: [
  //       alias({
  //         elliptic: path.resolve(
  //           __dirname,
  //           '../',
  //           'includes/elliptic/elliptic.js',
  //         ),
  //       }),
  //       resolve({
  //         browser: true,
  //         jsnext: true,
  //         preferBuiltins: true,
  //       }),
  //       // babel(browserConfig),
  //       globals(),
  //       commonjs(),
  //       json(),
  //       typescript2({
  //         typescript: ts, // ensure we're using the same typescript (3.x) for rollup as for regular builds etc
  //         tsconfig: `${packagesPath}/${p.name}/tsconfig.json`,
  //         tsconfigOverride: {
  //           module: 'esnext',
  //           stripInternal: true,
  //           emitDeclarationOnly: false,
  //           composite: false,
  //           declaration: false,
  //           declarationMap: false,
  //           sourceMap: true,
  //         },
  //       }),
  //       license({
  //         banner: `Test Banner`,
  //       }),
  //     ],
  //     output: {
  //       file: `packages/${p.name}/dist/index.js`,
  //       exports: 'named',
  //       format: 'umd',
  //       sourcemap: true,
  //       name: camelCase(p.name),
  //       globals: {
  //         ...externalObject,
  //         tslib: 'tslib',
  //       },
  //     },
  //   };
  //   // return normal;
  //   return Object.assign(normal, externalSetting);
  // });
}

export default bundles();
