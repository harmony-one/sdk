// tslint:disable-next-line: no-implicit-dependencies
import camelCase from 'camelcase';
import {packages} from '../packagesTs';

export interface PackageItem {
  name: string;
  dest: string;
}

function generatePackageList(rawArray: string[]): PackageItem[] {
  const resultArray: PackageItem[] = [];
  for (const item of rawArray) {
    const name = camelCase(item)
      .replace('har', 'Har')
      .replace('Core', 'Js');
    const dest = item;
    resultArray.push({name, dest});
  }
  return resultArray;
}

export const packageList = generatePackageList(packages);
