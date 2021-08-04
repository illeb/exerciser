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
  
      this.app.route(`/users/:userId`)
          .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
              // this middleware function runs before any request to /users/:userId
              // but it doesn't accomplish anything just yet---
              // it simply passes control to the next applicable function below using next()
              next();
          })
          .get((req: express.Request, res: express.Response) => {
              res.status(200).send(`GET requested for id ${req.params.userId}`);
          })
          .put((req: express.Request, res: express.Response) => {
              res.status(200).send(`PUT requested for id ${req.params.userId}`);
          })
          .patch((req: express.Request, res: express.Response) => {
              res.status(200).send(`PATCH requested for id ${req.params.userId}`);
          })
          .delete((req: express.Request, res: express.Response) => {
              res.status(200).send(`DELETE requested for id ${req.params.userId}`);
          });
  
      return this.app;
    }

}