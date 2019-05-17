import * as path from 'path';
import * as fs from 'fs';
// tslint:disable-next-line: no-implicit-dependencies
import webpack from 'webpack';
// tslint:disable-next-line: no-implicit-dependencies
import camelCase from 'camelcase';

export const rootPath = path.resolve(__dirname, '../');
export const includesPath = path.join(rootPath, 'includes');
export const packagesPath = path.join(rootPath, 'packages');

export const preProcessProjects = {
  preprocess: [
    {
      name: 'elliptic',
      path: path.resolve(__dirname, '../node_modules/elliptic'),
      entry: 'lib/elliptic.js',
      outDir: path.join(includesPath, 'elliptic'),
    },
  ],
};

export function preProcessFunc(project) {
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

export const projects = fs
  .readdirSync(packagesPath)
  .filter((p) => fs.lstatSync(path.join(packagesPath, p)).isDirectory())
  .map((p) => {
    const pkgName = path.basename(p);
    const pkgGlobalName = camelCase(pkgName);
    const pkgPath = path.join(packagesPath, p);
    const pkgSrc = path.join(pkgPath, 'src');
    const pkgScopedName = `@harmony-js/${p.replace('harmony-', '')}`;
    const pkgDist = path.join(pkgPath, 'dist');

    const pkgUmd = path.join(pkgDist, 'index.umd.js');
    const pkgEsm = path.join(pkgDist, 'index.esm.js');
    const pkgSystem = path.join(pkgDist, 'index.system.js');
    const pkgAmd = path.join(pkgDist, 'index.amd.js');
    const pkgCjs = path.join(pkgDist, 'index.cjs.js');
    const pkgIife = path.join(pkgDist, 'index.js');
    return {
      name: pkgName,
      globalName: pkgGlobalName,
      scopedName: pkgScopedName,
      path: pkgPath,
      src: pkgSrc,
      dist: pkgDist,
      umd: pkgUmd,
      esm: pkgEsm,
      cjs: pkgCjs,
      amd: pkgAmd,
      iife: pkgIife,
      system: pkgSystem,
    };
  });
