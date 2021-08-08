import { Quiz } from './quiz';

export class Category {
  id: number | null;
  name: string;
  quiz: Quiz[] = [];

  constructor(id: number | null, name: string, quiz?: Quiz[]) {
    this.id = id;
    this.name = name;
    if(quiz) {
      this.quiz = quiz;
    }
  }
}