import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/model/category";
import { Question } from "src/app/model/quiz";
import { Questionnarie } from "./model/Questionnarie";
import { generateQuizByComposerSuccess, loadCategories, loadCategoriesError, loadCategoriesSuccess,  } from "./quiz.actions";

export interface State {
  categories: Category[];
  questionnarie: Questionnarie;
}

const initialState: State = {
  categories: [],
  questionnarie: null,
}

export const QuizReducer = createReducer(
  initialState,
  // TODO: attach spinner to loadCategories?
  on(loadCategories, (state) => {  
    return ({...state})
  }),
  on(loadCategoriesSuccess, (state, {categories}) => ({...state, categories})),
  // on(loadCategoriesError, (state) => ({...state, ...{spinner: {visible: false, caption: ''}}})), // TODO: i still need to handle errors, see https://medium.com/angular-in-depth/handling-error-states-with-ngrx-6b16f6d12a08
  on(generateQuizByComposerSuccess, (state, {quizzes}) => {
    const questionnarie = new Questionnarie();
    questionnarie.questions = quizzes;
    questionnarie.quizIndex = 0;
    return {...state, questionnarie};
  }),
);
