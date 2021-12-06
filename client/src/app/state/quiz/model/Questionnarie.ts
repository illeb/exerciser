import { Question } from "src/app/model/quiz";

interface ChoosenAnswer {
  quizId: number;  
}

export class Questionnarie {
  quizIndex: number;
  answers: ChoosenAnswer[];
  questions: Question[];
}