import path from 'path';
import {projects, preProcessFunc, preProcessProjects} from './projects';
// tslint:disable-next-line: no-implicit-dependencies no-var-requires
import spawn from 'cross-spawn';

// tslint:disable-next-line: no-var-requires
const runner = require.resolve('./typedoc/runner');
const batch = require.resolve('./typedoc/batch');
const options = {stdio: 'inherit'};

const outputs = process.argv.slice(2)[0].split(',');
// docusaurus,vuepress,gitbook,bitbucket

async function docs() {
  await preProcessFunc(preProcessProjects);
  for (const pkg of projects) {
    if (outputs.indexOf('gitbook') !== -1) {
      spawn(
        'node',
        [runner, '-p', `${pkg.path}`, '-s', `${pkg.src}`, '-t', 'gitbook'],
        options,
      );
    }
    if (outputs.indexOf('vuepress') !== -1) {
      spawn(
        'node',
        [runner, '-p', `${pkg.path}`, '-s', `${pkg.src}`, '-t', 'vuepress'],
        options,
      );
    }
    if (outputs.indexOf('docusaurus') !== -1) {
      spawn(
        'node',
        [runner, '-p', `${pkg.path}`, '-s', `${pkg.src}`, '-t', 'docusaurus'],
        options,
      );
    }
    if (outputs.indexOf('bitbucket') !== -1) {
      spawn(
        'node',
        [runner, '-p', `${pkg.path}`, '-s', `${pkg.src}`, '-t', 'bitbucket'],
        options,
      );
    }
    if (outputs.indexOf('default') !== -1) {
      spawn(
        'node',
        [runner, '-p', `${pkg.path}`, '-s', `${pkg.src}`, '-t', 'default'],
        options,
      );
    }
  }
}

docs();
