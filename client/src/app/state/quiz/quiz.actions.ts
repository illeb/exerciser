import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/model/category';

export const loadCategories = createAction('[Quiz Categories] begin');
export const loadCategoriesSuccess = createAction(
  '[Quiz Categories] success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesError = createAction(
  '[Quiz Categories] error', 
  props<{ error?: string }>()
);
