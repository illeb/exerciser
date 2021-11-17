import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from "rxjs/operators";
import { Category } from "src/app/model/category";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { QuizService } from "src/app/shared/services/quiz.service";
import { QuizGroupRequest } from "./model/QuizGroupRequest";
import { loadCategories, loadCategoriesSuccess, getQuizByComposer, getQuizByComposerSuccess } from './quiz.actions';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private categoriesService: CategoriesService, private quizService: QuizService) {}

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategories),
    concatMap(() => this.categoriesService.getCategories().pipe(
      map((categories: Category[]) =>
        loadCategoriesSuccess({ categories })
      )))
  ));

  quizComposer$ = createEffect(() => this.actions$.pipe(
    ofType(getQuizByComposer),
    concatMap(({ quizRequest }) => this.quizService.getQuizzes(quizRequest).pipe(
      map((values: any[]) => getQuizByComposerSuccess({ result: null }))))
  ));
}