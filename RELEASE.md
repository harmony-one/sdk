# Release Guidelines
## Before Release
1. Build source first
   ```bash
    yarn build:ts
   ```
2. Run unit tests
   ```bash
   yarn test:src
   ```
3. Run e2e tests
   ```bash
   yarn test:e2e
   ```
4. Clean and build bundle
   ```bash
   yarn dist
   ```
## Publish to npm using `dev:publish`

The packages is to be published to npm, using `@next` tag using script in `package.json`

Follow steps below to publish a npm verion using `@next` tag

1. Commit all changes to github master
2. Run publish script
   
```bash
  yarn dev:publish
```

3. Select version and confirm all prompts with `Y`
4. See version changes in `npmjs.com`

This will not change the release version of current npm packages(currently 0.0.7), developers have to use `@next` to install from npm.

For example.

```bash
  npm install @harmony-js/core@next
```



## Publish to npm with `lerna`

Follow steps below to publish a npm verion with latest version

1. Commit all changes to github master
2. Run `lerna publish`, `lerna` is required globally.
   
```bash
  lerna publish
```
3. Select version and confirm all prompts with `Y`
4. See version changes in `npmjs.com`

This will change the release version of current npm packages to the latest version, developers can install from npm directly

For example.

```bash
  npm install @harmony-js/core
```






