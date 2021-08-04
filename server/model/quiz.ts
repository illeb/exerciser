export class Quiz {
  id: number;
  question: string;
  answers: string[] = [];
  correctAnswer: string;

  constructor(id: number, question: string, answers: string[], correctAnswer: string) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
}