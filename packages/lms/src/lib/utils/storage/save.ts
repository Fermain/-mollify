export const save = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};
