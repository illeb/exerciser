import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { loadCategories } from '@state/quiz/quiz.actions';
import { selectCategories } from '@state/quiz/quiz.selectors';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/model/category';
import { QuizGroupRequest } from '../../categories/QuizGroupRequest';

@Component({
  selector: 'app-questionarrie-chooser',
  template: `
    <h1 mat-dialog-title>Compose questionnarie</h1>
    <div mat-dialog-content>
      <div>
       <mat-form-field class="w100p" appearance="fill">
        <mat-label>Categories</mat-label>
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let category of selectedCategories" [selectable]="true" [removable]="true" (removed)="removeCategory(category)">
            {{category.name}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
        <input type="text" matInput [formControl]="categoriesCtrl" [matAutocomplete]="autocomplete" [matChipInputFor]="chipList">
        </mat-chip-list>
        
        <mat-autocomplete #autocomplete="matAutocomplete" (optionSelected)="selected($event)">
          <mat-option *ngFor="let category of categories$ | async" [value]="category">
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
      <button mat-button (click)="dialogRef.close()">CHIUDI</button>
      <button mat-button (click)="startQuiz()" cdkFocusInitial>START</button>
    </div>
  `,
  styleUrls: ['./questionarrie-chooser.component.scss']
})
export class QuestionarrieChooserComponent implements OnInit {
  public dialogRef: MatDialogRef<QuestionarrieChooserComponent>;

  numberQuestions: number = 15;
  selectedCategories: Category[] = [];
  isRandom: boolean = true;
  categoriesCtrl = new FormControl();
  categories$ = this.store.select(selectCategories);
  constructor(dialogRef: MatDialogRef<QuestionarrieChooserComponent>, router: Router, { snapshot }: ActivatedRoute, private store: Store<AppState>) {
    this.dialogRef = dialogRef;
    this.store = store;
    
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
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
  }

  selected(selected: MatAutocompleteSelectedEvent) {
    this.selectedCategories = this.selectedCategories.concat(selected.option.value)
  }

  removeCategory(category) {

  }

  startQuiz() {
    const quizGroupRequest = new QuizGroupRequest([], this.numberQuestions, false);
    this.dialogRef.close(quizGroupRequest);
  }
}
