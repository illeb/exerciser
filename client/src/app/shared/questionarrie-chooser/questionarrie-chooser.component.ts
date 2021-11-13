import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { loadCategories } from '@state/quiz/quiz.actions';
import { selectCategories } from '@state/quiz/quiz.selectors';
import { BehaviorSubject } from 'rxjs';
import { QuizGroupRequest } from '../../categories/QuizGroupRequest';

@Component({
  selector: 'app-questionarrie-chooser',
  template: `
    <h1 mat-dialog-title>Compose questionnarie</h1>
    <div mat-dialog-content>
      <div>
       <mat-form-field class="example-chip-list" appearance="fill">
        <mat-label>Categories</mat-label>
        <mat-chip-list #chipList>
          <mat-chip *ngFor="let category of selectedCategories" [selectable]="true" [removable]="true"
            (removed)="removeCategory(category)">
            {{category}}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip>
          <input type="text" placeholder="New fruit..." matInput [formControl]="categoriesCtrl" [matAutocomplete]="auto">
        </mat-chip-list>
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
          <mat-option *ngFor="let category of categories | async" [value]="category">
            {{category}}
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
      <button mat-button (click)="startQuiz()" cdkFocusInitial>AVVIA QUIZ</button>
    </div>
  `,
  styleUrls: ['./questionarrie-chooser.component.scss']
})
export class QuestionarrieChooserComponent implements OnInit {
  public dialogRef: MatDialogRef<QuestionarrieChooserComponent>;

  numberQuestions: number = 15;
  selectedCategories = [];
  categories = new BehaviorSubject([]);
  isRandom: boolean = true;
  categoriesCtrl = new FormControl();
  private _categories$ = this.store.select(selectCategories);
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
    this._categories$.subscribe((categories) => {
      debugger;
    })
  }

  selected(valueSelected) {

  }

  removeCategory(category) {

  }

  startQuiz() {
    const quizGroupRequest = new QuizGroupRequest([], this.numberQuestions, false);
    this.dialogRef.close(quizGroupRequest);
  }
}
