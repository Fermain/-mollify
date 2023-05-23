import * as storage from "./index.js";

export const load = (key) => {
    let item = JSON.parse(localStorage.getItem(key)) || null;
    if (!item) {
        item = storage.save(key, []);
    }
    return item;
};
