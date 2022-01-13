import { AppState } from "./AppState";

export const set = function (property) {
  return function (state: AppState, payload) {
    let newState = { ...state };
    newState[property] = payload;
    return newState;
  };
};

export const toggle = function (property) {
  return function (state: AppState) {
    let newState = { ...state };
    newState[property] = !state[property];
    return newState;
  };
};
