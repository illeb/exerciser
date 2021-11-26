import { createAction, createSelector, props } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { State as QuizState } from './quiz.reducer';

export const selectCategories = createSelector(
  (state: AppState) => state.quiz,
  (quizState: QuizState) => quizState.categories
)

export const selectGeneratedQuiz = createSelector(
  (state: AppState) => state.quiz,
  (quizState: QuizState) => quizState.generatedQuiz
)
