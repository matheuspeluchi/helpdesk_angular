import State from "./state";
import { set, toggle } from "./utils";
import { createAction, createReducer, on } from "@ngrx/store";

export const toggleMenu = createAction("[App] Toggle menu");

export const appReducer = createReducer(
  State,
  on(toggleMenu, (state) => {
    state = {
      ...state,
      drawer: !state.drawer,
    };
    return state;
  })
);
