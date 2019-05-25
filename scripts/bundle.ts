import * as fs from 'fs';
import * as path from 'path';
// tslint:disable-next-line: no-implicit-dependencies
import * as rollup from 'rollup';
// tslint:disable-next-line: no-implicit-dependencies
import alias from 'rollup-plugin-alias';
// tslint:disable-next-line: no-implicit-dependencies
import builtins from 'rollup-plugin-node-builtins';
// tslint:disable-next-line: no-implicit-dependencies
import commonjs from 'rollup-plugin-commonjs';
// tslint:disable-next-line: no-implicit-dependencies
import license from 'rollup-plugin-license';
// tslint:disable-next-line: no-implicit-dependencies
import json from 'rollup-plugin-json';
// tslint:disable-next-line: no-implicit-dependencies
import globals from 'rollup-plugin-node-globals';
// tslint:disable-next-line: no-implicit-dependencies
import resolve from 'rollup-plugin-node-resolve';
// tslint:disable-next-line: no-implicit-dependencies
import typescript2 from 'rollup-plugin-typescript2';
// tslint:disable-next-line: no-implicit-dependencies
import ts from 'typescript';

import { projects, preProcessFunc, preProcessProjects } from './projects';

function getKeys(p) {
  const packageJsonFile = `${process.cwd()}/packages/${p}/package.json`;
  const data = fs.readFileSync(packageJsonFile, 'utf-8');

  const { dependencies } = JSON.parse(data);

  // .filter((d) => !/harmony/.test(d))
  const keys = dependencies ? Object.keys(dependencies) : [];
  return keys;
}

async function bundles() {
  await preProcessFunc(preProcessProjects);

  for (const pkg of projects) {
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
        commonjs(),
        globals(),
        builtins(),
        json(),
        typescript2({
          typescript: ts, // ensure we're using the same typescript (3.x) for rollup as for regular builds etc
          tsconfig: path.join(pkg.path, 'tsconfig.json'),
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
      external: getKeys(pkg.name),
      // external: projects
      //   .filter((p) => p.name !== pkg.name)
      //   .map((p) => p.scopedName)
      // .concat(['cross-fetch']),
    };

    const pkgBundler = await rollup.rollup(base);

    await pkgBundler.write({
      file: pkg.esm,
      name: pkg.globalName,
      format: 'esm',
      sourcemap: true,
    });
    await pkgBundler.write({
      file: pkg.umd,
      exports: 'named',
      name: pkg.globalName,
      globals: {
        // tslint:disable-next-line: no-shadowed-variable
        // ...projects.reduce((g, pkg) => {
        //   g[pkg.scopedName] = pkg.globalName;
        //   return g;
        // }, {}),
        ...getKeys(pkg.name).reduce((g, packages) => {
          if (packages === pkg.name) {
            g[pkg.scopedName] = pkg.globalName;
          } else {
            g[packages] = packages;
          }
          return g;
        }, {}),
        tslib: 'tslib',
      },
      format: 'umd',
      sourcemap: true,
    });
    await pkgBundler.write({
      file: pkg.cjs,
      name: pkg.globalName,
      format: 'cjs',
      sourcemap: true,
    });
  }
}

bundles();
