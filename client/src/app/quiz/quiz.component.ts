import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { selectGeneratedQuiz } from '@state/quiz/quiz.selectors';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Component({
  selector: 'app-quiz',
  template: `

    <mat-progress-bar mode="determinate" value="40"></mat-progress-bar>
<!-- 
    <mat-card>
      <mat-card-title>Shiba Inu</mat-card-title>
      <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      <mat-card-content>
        <p>This card indeterminates progress bar.</p>
        <p>{{longText}}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card> -->
  `,
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  private quizzes$: Observable<Quiz[]>;

  constructor(private store: Store<AppState>) { 
    this.quizzes$ = store.select(selectGeneratedQuiz);
  }

  ngOnInit(): void {
    
  }

}
