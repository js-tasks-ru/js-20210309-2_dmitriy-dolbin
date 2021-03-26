/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string === '' || size === undefined) return string;
  if (size === 0) return '';
  const arr = Array.from(string);
  const objSize = {};
  let newStr = "";
  arr.forEach(function (item, index, array) {
    objSize[item] = objSize[item] + 1 || 1;
    if (objSize[item] <= size) {
      newStr += item;
      if (item !== array[index - 1] && index > 0) {
        objSize[array[index - 1]] = 0;
      }
    }
  });
  return newStr;
}
