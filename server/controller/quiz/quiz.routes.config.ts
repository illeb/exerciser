import {CommonRoutesConfig} from '../../common/common.routes.config';
import express from 'express';
import { getCategories, getQuiz } from '../../database';

export class QuizRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'QuizRoutes');
    }

    configureRoutes() {
      this.app.route(`/quiz/:categoryId`)
          .get((req: express.Request, res: express.Response) => {
              const Quizzes = getQuiz(+req.params.categoryId);
              res.status(200).send(Quizzes);
          })  
      return this.app;
    }
}