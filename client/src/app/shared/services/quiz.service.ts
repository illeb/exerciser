import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizGroupRequest } from '@state/quiz/model/QuizGroupRequest';
import { Category } from '../../model/category';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(QuizGroupRequest: QuizGroupRequest) {
    return this.http.post<Category[]>('/generateQuiz', { QuizGroupRequest });
  }
}
