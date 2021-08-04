import {CommonRoutesConfig} from '../../common/common.routes.config';
import express from 'express';
import { getCategories } from '../../database';

export class CategoriesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CategoriesRoutes');
    }

    configureRoutes() {
      this.app.route(`/categories`)
          .get((req: express.Request, res: express.Response) => {
              const categories = getCategories();
              res.status(200).send(categories);
          })
  
      return this.app;
    }
}