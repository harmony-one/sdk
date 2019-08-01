// tslint:disable-next-line: no-implicit-dependencies
import webpack from 'webpack';
// tslint:disable-next-line: no-implicit-dependencies

import batch from './webpack/webpack.config';

webpack(batch).run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    stats.toString({
      all: false,
      modules: false,
      errors: true,
      warnings: false,
      moduleTrace: true,
      errorDetails: true,
      chunks: true,
      colors: true,
    }),
  );
});
