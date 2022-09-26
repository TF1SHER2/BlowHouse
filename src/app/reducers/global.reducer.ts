import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "../models/app.state";
import { setContainerTypeAction, SetContainerTypeProps, setScreenWidthAction, SetScreenWidthProps } from "../actions/global.actions"

const initialState: GlobalState = {};

export const globalReducer = createReducer(
  initialState,

  on(setContainerTypeAction, (state, data: SetContainerTypeProps) => {
    return ({
      ...state,
      containerType: data.containerType
    });
  }),

  on(setScreenWidthAction, (state, data: SetScreenWidthProps) => {
    return ({
      ...state,
      screenWidth: data.screenWidth
    });
  })
);
