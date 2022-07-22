import express from 'express';

import { categoriesMiddlewares } from '../middlewares/index.js';
import { categoriesController } from '../controllers/index.js';

const categoriesRoutes = express.Router();

categoriesRoutes.post(
  '/categories',
  categoriesMiddlewares.verifyCategory,
  categoriesMiddlewares.verifyExistingCategory,
  categoriesController.registerCategory
);
categoriesRoutes.get('/categories', categoriesController.retrieveAllCategories);

export default categoriesRoutes;
