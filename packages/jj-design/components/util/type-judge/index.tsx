export function isObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
}

export function isString(target: any) {
  return typeof target === 'string';
}