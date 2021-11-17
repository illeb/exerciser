import { Category } from "src/app/model/category";

export class QuizGroupRequest {
  numberQuestions = 0;
  categories: Category[] = [];
  random = false;

  constructor(categories: Category[], numberQuestions: number, random: boolean) {
    this.categories = categories;
    this.numberQuestions = numberQuestions;
    this.random = random;
  }
}
