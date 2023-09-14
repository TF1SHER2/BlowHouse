import { createAction, props } from "@ngrx/store";
import { ScreenWidth } from "src/app/models/screenWidth";

export interface SetContainerTypeProps {
  containerType: 'normal' | 'fluid'
}

export const setContainerTypeAction = createAction(
  'SET_CONTAINER_TYPE',
  props<SetContainerTypeProps>()
);

export interface SetScreenWidthProps {
  screenWidth?: ScreenWidth;
}

export const setScreenWidthAction = createAction(
  'SET_SCREEN_WIDTH',
  props<SetScreenWidthProps>()
);
