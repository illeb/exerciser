import { State as UIState } from './ui/ui.reducer';
import { State as QuizState } from './quiz/quiz.reducer';

export interface AppState {
  ui: UIState,
  quiz: QuizState
};