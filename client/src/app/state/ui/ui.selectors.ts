import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { State as UIState } from './ui.reducer';

export const selectSpinner = createSelector(
  (state: AppState) => state.ui,
  (uiState: UIState) => uiState.spinner
);

