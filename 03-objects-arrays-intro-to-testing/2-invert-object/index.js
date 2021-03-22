/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj === Object(obj)) {
    const aKeys = Object.keys(obj);
    const map = new Map();
    for (const key of aKeys) {
      map.set(obj[key], key);
    }
    return Object.fromEntries(map.entries());
  }
}
