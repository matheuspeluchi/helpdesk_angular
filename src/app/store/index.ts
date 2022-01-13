import State from "./State";
import { createReducer, on } from "@ngrx/store";
import { setUser, toggleMenu } from "./actions";
import { set, toggle } from "./utils";

export const appReducer = createReducer(State, on(toggleMenu, toggle("drawer")), on(setUser, set("user")));
