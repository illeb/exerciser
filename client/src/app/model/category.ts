import { Question } from './quiz';

export class Category {
  id: number | null;
  name: string;
  quiz: Question[] = [];

  constructor(id: number | null, name: string, quiz?: Question[]) {
    this.id = id;
    this.name = name;
    if(quiz) {
      this.quiz = quiz;
    }
  }
}