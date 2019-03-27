export default {
  babelrc: false,
  runtimeHelpers: true,
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: ['>0.25%']
        },
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    ['@babel/transform-runtime'],
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-export-default-from',
    '@babel/proposal-export-namespace-from',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/proposal-class-properties',
    'add-module-exports'
  ],
  exclude: 'packages/**/node_modules/**'
}
