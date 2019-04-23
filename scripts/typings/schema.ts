import * as fs from 'fs';
import * as path from 'path';
// tslint:disable-next-line: no-implicit-dependencies
import * as schemas from 'typescript-json-schema';

import { packages } from '../packagesTs';
import tsConfig from '../../tsconfig.base.json';

const outputs = process.argv.slice(2)[0].split(',');

const rootPath = path.resolve(__dirname, '../..');
const includesPath = path.join(rootPath, 'includes');
const packagesPath = path.join(rootPath, 'packages');

async function generateSchemas() {
  packages
    // @ts-ignore
    .filter((pkg) => {
      return (
        pkg !== 'harmony-' &&
        outputs.indexOf(pkg.replace('harmony-', '')) !== -1
      );
    })
    .forEach((pkg) => {
      const pkgPath = path.join(packagesPath, pkg);
      const pkgSrc = path.join(pkgPath, 'src');
      const settings = {
        ref: false,
      };
      // tslint:disable-next-line: no-shadowed-variable
      const tsConfig: schemas.CompilerOptions = {
        lib: ['es2015'],
      };

      const prog = schemas.getProgramFromFiles(
        [path.resolve(path.join(pkgSrc, 'types.ts'))],
        tsConfig,
      );

      const schema = schemas.generateSchema(prog, '*', settings);

      // fs.writeFileSync(
      //   path.join(pkgPath, 'test', 'schema.json'),
      //   JSON.stringify(schema, undefined, 2),
      // );
    });
}

generateSchemas();
