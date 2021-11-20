import {CommonRoutesConfig} from '../../common/common.routes.config';
import express from 'express';
import * as db from '../../database';
import { Quiz } from '../../model/quiz';
import shuffle from 'lodash/shuffle';

interface GetQuizzesParams {
    categories: string[],
    random: string
};
export class QuizRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuizRoutes');
    }

    configureRoutes() {
      this.app.route(`/quiz/:categoryId`)
          .get((req: express.Request, res: express.Response) => {
              const Quizzes = db.getQuiz(+req.params.categoryId);
              res.status(200).send(Quizzes);
          })
          
      this.app.route(`/generate`)
        .get((req: express.Request, res: express.Response) => {
            const { categories, random, amount } = req.query as any;
            let quizzes = db.getQuizzesByCategories([...categories], amount);
            // let quizzes = categories.reduce(( quizzes: Quiz[], categoryId: string) => {
            //     return quizzes.concat(db.getQuiz(+categoryId));
            // }, []);
            if(random === true) {
                quizzes = shuffle(quizzes)
            }
            quizzes = quizzes.slice(0, +amount);
            res.status(200).send(quizzes);
        });
      return this.app;
    }
}