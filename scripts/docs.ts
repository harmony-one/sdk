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

// docs();

async function batchDocs() {
  await preProcessFunc(preProcessProjects);
  // const srcArry = [];
  // for (const pkg of projects) {
  //   srcArry.push(pkg.src);

  // }
}

batchDocs();

// async function docs() {
//   await preProcessFunc(preProcessProjects);

//   for (const pkg of projects) {
//     const app = new Application({
//       mode: 'file',
//       tsconfig: `${pkg.path}/tsconfig.json`,
//       theme: 'markdown',
//       plugin: path.resolve('node_modules/typedoc-plugin-markdown'),
//       platform: 'gitbook',
//     });

//     const files = [...app.expandInputFiles([pkg.src])];
//     app.options.setValue('platform', 'gitbook');
//     // const project = app.convert();
//     const outputDir = `${pkg.path}/doc`;

//     // Rendered docs
//     app.generateDocs(files, outputDir);
//     // if (project) {
//     //   // Project may not have converted correctly
//     //   const outputDir = `${pkg.path}/doc`;

//     //   // Rendered docs
//     //   app.generateDocs(project, outputDir);
//     //   // Alternatively generate JSON output
//     //   // app.generateJson(project, outputDir + '/documentation.json');
//     // }
//   }
// }

// docs();
