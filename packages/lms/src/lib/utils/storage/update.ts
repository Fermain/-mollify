import * as storage from './index.js';

/**
 * Updates a key/value pair in localStorage
 * @param {string} key the name of the key to update
 * @param {string} property the name of the value you want to update
 * @param {string} value the value you want to edit into the key/value pair
 * @example
 * ```js
 * updateItem("user", "name", "Mike");
 * // Expect the function to change the value of the property in the key you specify.
 * ```
 */
export function update(key: string, property: string, value: unknown) {
  const obj = storage.load(key);
  obj[property] = value;
  storage.save(key, obj);
}
