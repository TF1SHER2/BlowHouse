import { InjectionToken } from "@angular/core";
import { getSelectors, routerReducer } from "@ngrx/router-store";
import * as fromRouter from '@ngrx/router-store';
import { globalReducer } from "../reducers/global.reducer";

export interface GlobalState {
  containerType?: 'normal' | 'fluid'
}

export interface AppState {
  globalState: GlobalState,
  router: fromRouter.RouterReducerState
}

export const ROOT_REDUCER = new InjectionToken<any>('Root Reducer', {
  factory: () => ({
    globalState: globalReducer,
    router: routerReducer
  })
});

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

export const selectContainerType = (state: AppState) => state.globalState.containerType;
