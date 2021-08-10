import {CommonRoutesConfig} from '../../common/common.routes.config';
import express from 'express';
import { parseQuestions } from '../../parsers/quiz-extractor.js'
import * as db from '../../database';

export class ParserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'ParserRoutes');
    }

    configureRoutes() {
        this.app.route(`/parse/:bancaDatiId`)
          .put(async (req: express.Request, res: express.Response) => {
              const categories = await parseQuestions(+req.params.bancaDatiId);
              categories.forEach(category => db.putCategory(category));
              res.status(200).send('ok');
          })
  
      return this.app;
    }
}