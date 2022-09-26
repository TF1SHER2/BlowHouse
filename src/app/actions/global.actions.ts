import { createAction, props } from "@ngrx/store";

export interface SetContainerTypeProps {
  containerType: 'normal' | 'fluid'
}

export const setContainerTypeAction = createAction(
  'SET_CONTAINER_TYPE',
  props<SetContainerTypeProps>()
);

export interface SetScreenWidthProps {
  screenWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const setScreenWidthAction = createAction(
  'SET_SCREEN_WIDTH',
  props<SetScreenWidthProps>()
);
