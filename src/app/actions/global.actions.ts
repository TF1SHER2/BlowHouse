import { createAction, props } from "@ngrx/store";

export interface SetContainerTypeProps {
  containerType: 'normal' | 'fluid'
}

export const setContainerTypeAction = createAction(
  'SET_CONTAINER_TYPE',
  props<SetContainerTypeProps>()
);
