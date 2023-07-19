import * as storage from './index.js';

export const load = (key: string) => {
  let item = JSON.parse(localStorage[key] || null);
  if (!item) {
    item = storage.save(key, []);
  }
  return item;
};
