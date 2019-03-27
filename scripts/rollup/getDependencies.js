import fs from 'fs';

export function getKeys(p) {
  const packageJsonFile = `${process.cwd()}/packages/${p}/package.json`;
  const data = fs.readFileSync(packageJsonFile, 'utf-8');

  const { dependencies } = JSON.parse(data);

  const keys = dependencies
    ? Object.keys(dependencies).filter((d) => !/harmony/.test(d))
    : [];
  return keys;
}
