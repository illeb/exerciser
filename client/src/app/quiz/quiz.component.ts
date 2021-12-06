import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { selectGeneratedQuiz } from '@state/quiz/quiz.selectors';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Component({
  selector: 'app-quiz',
  template: `
    <div class="progress">
      <div> {{currentIndex}} of {{totalQuestions}} </div>
      <mat-progress-bar mode="determinate" [value]="(currentIndex / totalQuestions) * 100"></mat-progress-bar>
    </div>

    <mat-card>
      <mat-card-title>Domanda numero 088</mat-card-title>
      <mat-card-subtitle>Category</mat-card-subtitle>
      <mat-card-content>
        <p>Actual question</p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  private quizzes$: Observable<Quiz[]>;
  currentIndex = 1;
  totalQuestions = 20;

  constructor(private store: Store<AppState>) { 
    this.quizzes$ = store.select(selectGeneratedQuiz);
  }

  ngOnInit(): void {
    
  }

}
