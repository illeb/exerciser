import { CREATE_TABLE_CATEGORIES, CREATE_TABLE_ANSWERS, CREATE_TABLE_QUIZ, GET_CATEGORIES, CHECK_TABLE_EXIST, GET_QUIZ_BY_CATEGORY, GET_ANSWERS_BY_QUIZ } from './stmt';
import betterSqlite from 'better-sqlite3';
import { Category } from '../model/category';
import { Quiz } from '../model/quiz';

const db = betterSqlite('db.db');

const init = () => {
  db.prepare(CREATE_TABLE_CATEGORIES).run();
  db.prepare(CREATE_TABLE_QUIZ).run();
  db.prepare(CREATE_TABLE_ANSWERS).run();
}

const getCategories = (): Category[] => {
  const categories = db.prepare(GET_CATEGORIES).all().map(result => {
    return new Category(result.id, result.name)
  });

  return categories
}

const getQuiz = (categoryId: number): Quiz[] => {
  const quizzes = db.prepare(GET_QUIZ_BY_CATEGORY).all(categoryId).map(result => {
    const answersResult = db.prepare(GET_ANSWERS_BY_QUIZ).all(result.id);
    const answers = answersResult.map(v => v.answer);
    const { answer: correctAnswer } = answers.find(answer => answer.isCorrect);
    return new Quiz(result.quizID, result.question, answers, correctAnswer)
  });

  return quizzes;
}

export {init, getCategories, getQuiz}

