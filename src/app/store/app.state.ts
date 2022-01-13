import { createAction, createReducer, on } from "@ngrx/store";
import { IAppState } from "./IAppState";

export const AppInitialState: IAppState = {
  drawer: true,
};

export const toggle = createAction("[App] Toggle menu");

export const appReducer = createReducer(
  AppInitialState,
  on(toggle, (state) => {
    state = {
      ...state,
      drawer: !state.drawer,
    };
    return state;
  })
);
