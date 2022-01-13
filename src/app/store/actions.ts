import { createAction } from "@ngrx/store";
import { User } from "../models/user";

export const toggleMenu = createAction("[App] Toggle menu");
export const setUser = createAction("[App] Set user", (payload: User) => payload);
