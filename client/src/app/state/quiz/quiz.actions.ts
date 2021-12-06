import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/model/category';
import { Question } from 'src/app/model/quiz';
import { QuizGroupRequest } from './model/QuizGroupRequest';

export const loadCategories = createAction('[Quiz Categories] begin');
export const loadCategoriesSuccess = createAction(
  '[Quiz Categories] success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesError = createAction(
  '[Quiz Categories] error',
  props<{ error?: string }>()
);

export const generateQuizByComposer = createAction(
  '[Quiz composer] begin',
  props<{ quizRequest: QuizGroupRequest }>()
);
export const generateQuizByComposerSuccess = createAction(
  '[Quiz composer] success',
  props<{ quizzes: Question[] }>()
);
export const getQuizByComposerError = createAction(
  '[Quiz composer] error'
);
