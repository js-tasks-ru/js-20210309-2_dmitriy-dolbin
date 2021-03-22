/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const aKeys = path.split('.');
  return function getter(obj) {
    let nIndexKey = 0;
    let bIsObj = false;
    let objNew = obj;
    while (!bIsObj) {
      if (objNew[aKeys[nIndexKey]] === Object(objNew[aKeys[nIndexKey]])) {
        bIsObj = false;
        objNew = objNew[aKeys[nIndexKey]];
        nIndexKey++;
      } else {
        bIsObj = true;
        objNew = objNew[aKeys[nIndexKey]];
      }
    }
    return objNew;
  }
}
