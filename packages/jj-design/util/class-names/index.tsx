import { isObject, isString } from "../type-judge";

export const classNames = function (...argus) {
  const params = [...arguments];
  const classes: Array<string> = [];
  for (let i = 0; i < params.length; i++) {
    if (!Boolean(params[i])) {
      continue;
    }
    if (isObject(params[i])) {
      // handle Object
      for (const key in params[i]) {
        if (params[i].hasOwnProperty(key) && params[i][key]) {
          classes.push(key);
        }
      }
    } else if (isString(params[i])) {
      classes.push(params[i])
    }
  }
  return classes.join(' ');

}