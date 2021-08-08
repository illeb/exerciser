import {CommonRoutesConfig} from '../../common/common.routes.config';
import express from 'express';
import { getCategories } from '../../database';
import { parseQuestions } from '../../parsers/quiz-extractor.js'

export class ParserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ParserRoutes');
    }

    configureRoutes() {
        this.app.route(`/parse/:bancaDatiId`)
          .get(async (req: express.Request, res: express.Response) => {
              const Quizzes = await parseQuestions(+req.params.bancaDatiId);
              console.log(Quizzes);
              res.status(200).send(Quizzes);
          })
  
      return this.app;
    }
}