import { CREATE_TABLE_CATEGORIES, CREATE_TABLE_ANSWERS, CREATE_TABLE_QUIZ, GET_CATEGORIES, CHECK_TABLE_EXIST, GET_QUIZ_BY_CATEGORY, GET_ANSWERS_BY_QUIZ, INSERT_CATEGORY, INSERT_QUIZ, INSERT_ANSWER } from './stmt';
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
  const quizzes = db.prepare(GET_QUIZ_BY_CATEGORY).all(categoryId).map(({ id, question, }) => {
    const answersResult = db.prepare(GET_ANSWERS_BY_QUIZ).all(id);
    const answers = answersResult.map(v => v.answer);
    const { answer: correctAnswer } = answersResult.find(answer => answer.isCorrect);
    return new Quiz(id, question, answers, correctAnswer)
  });

  return quizzes;
}

const putCategory = (category: Category) => {
  const {lastInsertRowid: idCategoria} = db.prepare(INSERT_CATEGORY).run(category.id, category.name);
  category.quiz.forEach((quiz: Quiz) => { 
    const {lastInsertRowid: idQuizInserito} = db.prepare(INSERT_QUIZ).run(quiz.id, quiz.question, idCategoria);
    
    quiz.answers.forEach((answer) => {
      db.prepare(INSERT_ANSWER).run(null, answer, answer === quiz.correctAnswer ? 1 : 0, idQuizInserito);
    })
  });
}

export {init, getCategories, getQuiz, putCategory}

