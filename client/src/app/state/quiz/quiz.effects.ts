import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from "rxjs/operators";
import { Category } from "src/app/model/category";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { loadCategories, loadCategoriesSuccess } from './quiz.actions';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private categoriesService: CategoriesService) {}

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategories),
    concatMap(() => this.categoriesService.getCategories().pipe(
      map((categories: Category[]) =>
        loadCategoriesSuccess({ categories })
      )))
  ));
}