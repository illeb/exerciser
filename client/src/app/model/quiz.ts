export interface Answer {
  id: number;
  description: String;
  correct: boolean;
}

export class Quiz {
  id: number | null;
  question: string;
  answers: Answer[] = [];
  correctAnswer: string;

  constructor(id: number | null, question: string, answers: Answer[]) {
    this.id = id;
    this.question = question;
    this.answers = answers;
  }

  getCorrectAnswer(): Answer {
    return this.answers.find(answer => answer.correct);
  }
}