import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizGroupRequest } from '@state/quiz/model/QuizGroupRequest';
import { Question } from 'src/app/model/quiz';
import { Category } from '../../model/category';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuizzes(quizGroupRequest: QuizGroupRequest) {
    const params = {
      categories: quizGroupRequest.categories.map(c => c.id),
      random: quizGroupRequest.random,
      amount: quizGroupRequest.numberQuestions
    }
    return this.http.get<Question[]>('/generate', { params });
  }
}
