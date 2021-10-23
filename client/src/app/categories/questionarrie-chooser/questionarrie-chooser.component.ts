import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuizGroupRequest } from '../QuizGroupRequest';

@Component({
  selector: 'app-questionarrie-chooser',
  template: `
    <h1 mat-dialog-title>Componi questionario</h1>
    <div mat-dialog-content>
      <mat-form-field class="w100p">
        <mat-label>Numero domande</mat-label>
        <input matInput [(ngModel)]="numberQuestions">
      </mat-form-field>

      <br>
      <mat-slide-toggle [(ngModel)]="isRandom">
        Casuali
      </mat-slide-toggle>
    </div>

    <div mat-dialog-actions class="f-push-right">
      <button mat-button (click)="dialogRef.close()">CHIUDI</button>
      <button mat-button (click)="startQuiz()" cdkFocusInitial>AVVIA QUIZ</button>
    </div>
  `,
  styleUrls: ['./questionarrie-chooser.component.scss']
})
export class QuestionarrieChooserComponent {

  numberQuestions: number = 15;
  isRandom: boolean = true;
  constructor(public dialogRef: MatDialogRef<QuestionarrieChooserComponent>) {}

  startQuiz() {
    const quizGroupRequest = new QuizGroupRequest([], this.numberQuestions, false);
    this.dialogRef.close(quizGroupRequest);
  }
}
