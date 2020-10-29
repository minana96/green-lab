// @flow

const isString = obj =>
  typeof obj === 'string';

export const trim = (str?: string = ''): string => {
  if (!isString(str)) return '';
  return str.replace(/^\s+|\s+$/g, '');
};

export const some = <T>(arr: T[] = [], pred: (elm: T, index: number, arr: T[]) => boolean) =>
  arr.filter(pred).length > 0;

export const toLower = (obj?: string) => {
  if (obj !== undefined && isString(obj)) {
    return obj.toLowerCase();
  } else {
    return '';
  }
};

export const isPresent = (str: string) =>
  isString(str) && str.length > 0;

export const isObject = (obj: mixed): boolean =>
  !Array.isArray(obj) &&
  typeof obj === 'object' &&
  Object.prototype.toString.call(obj) === '[object Object]';

export const isFunction = (obj: mixed): boolean =>
  typeof obj === 'function';

export const startsWith = (str: string, prefix: string) =>
  str !== undefined &&
  prefix !== undefined &&
  str.slice(0, prefix.length) === prefix;

export const endsWith = (str: string, suffix: string) =>
  str !== undefined &&
  suffix !== undefined &&
  str.slice(str.length - suffix.length, str.length) === suffix;

export const findIndex = <T>(arr: T[], fn: (val: T) => boolean) => {
  const len = arr.length;
  let i = -1;

  while (++i < len) {
    const val = arr[i];

    if (fn(val) === true) {
      return i;
    }
  }

  return -1;
};

export const find = <T>(arr: T[], fn: (val: T) => boolean): ?T => {
  const index = findIndex(arr, fn);
  return arr[index];
};

export const stripExtraWhiteSpace = (str: string) => trim(str).replace(/\s+|\s?\n\s?$/g, ' ');
