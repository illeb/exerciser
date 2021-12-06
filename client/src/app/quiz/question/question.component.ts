import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer, Question } from 'src/app/model/quiz';

@Component({
  selector: 'app-question',
  template: `
    <mat-card>
      <mat-card-title>Domanda {{question.id}}</mat-card-title>
      <mat-card-subtitle>Category</mat-card-subtitle>
      <mat-card-content>
        <p>{{question.question}}</p>
      </mat-card-content>
    </mat-card>

    <div class="answers">
      <mat-card *ngFor="let answer of question.answers">
        <mat-card-content>
          <p>{{answer.description}}</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question: Question;
  @Output() answerSelected = new EventEmitter<Answer>();
  constructor() { }

}
