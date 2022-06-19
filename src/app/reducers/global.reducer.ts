import { createReducer, on } from "@ngrx/store";
import { GlobalState } from "../models/app.state";
import { setContainerTypeAction, SetContainerTypeProps } from "../actions/global.actions"

const initialState: GlobalState = {};

export const globalReducer = createReducer(
  initialState,

  on(setContainerTypeAction, (state, data: SetContainerTypeProps) => {
    return ({
      ...state,
      containerType: data.containerType
    });
  })
);
