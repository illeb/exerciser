import { ApplicationRef, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { QuizGroupRequest } from '@state/quiz/model/QuizGroupRequest';
import { loadCategories, getQuizByComposer, getQuizByComposerSuccess } from '@state/quiz/quiz.actions';
import { selectCategories } from '@state/quiz/quiz.selectors';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-questionarrie-chooser',
  template: `
    <h1 mat-dialog-title>Compose questionnarie</h1>
    <div mat-dialog-content>
      <div>
       <mat-form-field class="w100p" appearance="fill">
        <mat-label>Categories</mat-label>
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let category of selectedCategories" [removable]="true" (removed)="removeCategory(category)">
            {{category.name}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
        <input type="text" #input matInput [formControl]="categoriesCtrl" [matAutocomplete]="autocomplete" [matChipInputFor]="chipList" #trigger="matAutocompleteTrigger">
        </mat-chip-list>
        
        <mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="selected($event, trigger)">
          <mat-option *ngFor="let category of filteredCategories | async" [value]="category">
            {{category.name}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      </div>
      <div>
        <mat-form-field>
          <mat-label>Questions N.</mat-label>
          <input matInput [(ngModel)]="numberQuestions">
        </mat-form-field>
        <mat-slide-toggle [(ngModel)]="isRandom">
          Make random
        </mat-slide-toggle>
      </div>
    </div>

    <div mat-dialog-actions class="f-push-right">
      <mat-error *ngIf="categoriesCtrl.invalid">{{getErrorMessage()}}</mat-error>
      <button mat-button (click)="dialogRef.close()">CHIUDI</button>
      <button mat-button (click)="startQuiz()" cdkFocusInitial>START</button>
    </div>
  `,
  styleUrls: ['./questionarrie-chooser.component.scss']
})
export class QuestionarrieChooserComponent {
  public dialogRef: MatDialogRef<QuestionarrieChooserComponent>;
  
  @ViewChild('input') input: ElementRef; 

  public numberQuestions: number = 15;
  public isRandom: boolean = true;
  public categoriesCtrl = new FormControl('', [this.hasSelectedValues()]);
  public filteredCategories: Observable<Category[]>;
  public selectedCategories: Category[] = [];
  private categories$: Observable<Category[]>;
  constructor(dialogRef: MatDialogRef<QuestionarrieChooserComponent>, private router: Router, { snapshot }: ActivatedRoute, private store: Store<AppState>, private actions$: Actions) {
    this.dialogRef = dialogRef;
    this.store = store;
    this.store.dispatch(loadCategories());
    this.categories$ = store.select(selectCategories);
    
    this.dialogRef.beforeClosed().subscribe(() => {
      // Remove query params
      router.navigate([], {
        queryParams: {
          ...snapshot.queryParams,
          modal: null
        },
        queryParamsHandling: 'merge'
      })
    })

    this.filteredCategories = combineLatest([
      this.categories$, 
      this.categoriesCtrl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([categories, searchValue]: [Category[], string | Category]) => {
        const name = typeof searchValue === 'string' ? searchValue : searchValue.name;
        return categories.filter(category => !this.selectedCategories.includes(category) && category.name.toLowerCase().includes(name.toLowerCase()));
      })
    )
  }

  selected(selected: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger) {
    this.selectedCategories = this.selectedCategories.concat(selected.option.value);
    this.categoriesCtrl.reset('');
    this.input.nativeElement.value = '';
    setTimeout(() => {
      trigger.openPanel(); // sadly, haven't found any other way to do this :(
    }, 100)
  }

  removeCategory(category) {
    this.selectedCategories = this.selectedCategories.filter(currCategory => currCategory != category);
  }

  getErrorMessage() {
    if (this.categoriesCtrl.hasError('emptyList')) {
      return 'A value is required';
    }
    return '';
  }

  startQuiz() {
    const quizRequest = new QuizGroupRequest(this.selectedCategories, this.numberQuestions, false);
    this.store.dispatch(getQuizByComposer({ quizRequest }));
    this.actions$.pipe(
      ofType(getQuizByComposerSuccess),
      take(1)
    ).subscribe(() => {
      this.router.navigate(['quiz'])
      this.dialogRef.close(quizRequest);
    })
  }

  hasSelectedValues(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.touched && this.selectedCategories?.length === 0 ? {emptyList: true} : null;
    }
  }
}
