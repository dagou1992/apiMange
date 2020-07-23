export const SET_LOCAL_STORAGE = (name, value) =>
  window.localStorage.setItem(name, value);
export const GET_LOCAL_STORAGE = name => window.localStorage.getItem(name);
export const CLEAR_LOCAL_STORAGE = name => window.localStorage.removeItem(name);
