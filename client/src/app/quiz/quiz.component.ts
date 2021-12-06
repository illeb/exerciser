import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Questionnarie } from '@state/quiz/model/Questionnarie';
import { selectQuestionnarie } from '@state/quiz/quiz.selectors';
import { Observable } from 'rxjs';
import { Question } from '../model/quiz';

@Component({
  selector: 'app-questionnarie',
  template: `
    <div *ngIf="(questionnarie$ | async) as questionnarie">

      <div class="progress" >
        <div> {{questionnarie.quizIndex + 1}} of {{questionnarie.questions.length}} </div>
        <mat-progress-bar mode="determinate" [value]="(questionnarie.quizIndex / questionnarie.questions.length) * 100"></mat-progress-bar>
      </div>
      
      <app-question [question]="questionnarie.questions[questionnarie.quizIndex]"> </app-question>
    </div>
  `,
  styleUrls: ['./quiz.component.scss']
})
export class QuestionnarieComponent implements OnInit {
  questionnarie$: Observable<Questionnarie>;
  currentIndex = 1;
  totalQuestions = 20;

  constructor(private store: Store<AppState>) { 
    this.questionnarie$ = store.select(selectQuestionnarie);
  }

  ngOnInit(): void {
    
  }

}
