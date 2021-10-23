import { createReducer, on } from '@ngrx/store';
import SpinnerState from './model/spinner';
import { showSpinner, hideSpinner } from './ui.actions';

export interface State {
  spinner: SpinnerState;
}

export const initialState = {
  spinner: {
    visible: false,
    caption: ''
  }
};

export const UIReducer = createReducer(
  initialState,
  on(showSpinner, (state, { caption }) => ({...state, ...{spinner: {visible: true, caption}}})),
  on(hideSpinner, (state) => ({...state, ...{spinner: {visible: false, caption: ''}}})),
);
