import { createReducer, on } from '@ngrx/store';
import { showSpinner, hideSpinner } from './actions';

export const initialState = {
  spinner: {
    visible: false
  }
};

const _counterReducer = createReducer(
  initialState,
  on(showSpinner, (state) => ({...state, ...{spinner: {visible: true}}})),
  on(hideSpinner, (state) => ({...state, ...{spinner: {visible: false}}})),
);

export function UIReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
