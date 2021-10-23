import { createAction, props } from '@ngrx/store';

export const showSpinner = createAction(
  '[Ui Spinner] Show', 
  props<{ caption?: string }>()
);
export const hideSpinner = createAction(
  '[Ui Spinner] Hide'
);
