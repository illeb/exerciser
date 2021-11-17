import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/model/category";
import { getQuizByComposerSuccess, loadCategories, loadCategoriesError, loadCategoriesSuccess,  } from "./quiz.actions";

export interface State {
  categories: Category[];
}

const initialState: State = {
  categories: []
}

export const QuizReducer = createReducer(
  initialState,
  on(loadCategories, (state) => {  // TODO: attach spinner to loadCategories?
    return ({...state})
  }),
  on(loadCategoriesSuccess, (state, {categories}) => ({...state, categories})),
  // on(loadCategoriesError, (state) => ({...state, ...{spinner: {visible: false, caption: ''}}})), // TODO: i still need to handle errors, see https://medium.com/angular-in-depth/handling-error-states-with-ngrx-6b16f6d12a08
  on(getQuizByComposerSuccess, (state, {result}) => { 
    debugger;
    return ({...state, result})
  }),
);
