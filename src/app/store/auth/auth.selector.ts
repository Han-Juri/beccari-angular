import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeaturedKey } from "./auth.reducer";


export const selectAuthState =createFeatureSelector<AuthState>(authFeaturedKey)

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser)

export const selectIsAdmin = createSelector(selectAuthState, (state) => state.authUser?.role === 'admin')