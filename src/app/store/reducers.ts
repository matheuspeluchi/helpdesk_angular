import INITIAL_STATE from "./state";
import { createReducer, on } from "@ngrx/store";
import { set, toggle } from "./utils";
import * as AppActions from "./actions";

export const appReducer = createReducer(
  INITIAL_STATE,
  on(AppActions.toggleMenu, toggle("drawer")),
  on(AppActions.setUser, set("user"))
);
