import { CREATE_TABLE_CATEGORIES, CREATE_TABLE_ANSWERS, CREATE_TABLE_QUIZ, GET_CATEGORIES, CHECK_TABLE_EXIST } from './stmt';
import betterSqlite from 'better-sqlite3';
import { Category } from '../model/category';
const db = betterSqlite('db.db');

const init = () => {
  db.prepare(CREATE_TABLE_CATEGORIES).run();
  db.prepare(CREATE_TABLE_QUIZ).run();
  db.prepare(CREATE_TABLE_ANSWERS).run();
}

const getCategories = () => {
  const categories = db.prepare(GET_CATEGORIES).all().map(result => {
    return new Category(result.id, result.name)
  });

  return categories
}

const getQuiz = (categoryId: number) {

}

export {init, getCategories, getQuiz}

