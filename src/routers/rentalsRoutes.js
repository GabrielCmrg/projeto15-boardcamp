import express from 'express';

import { rentalsMiddlewares } from '../middlewares/index.js';
import { rentalsController } from '../controllers/index.js';

const rentalsRoutes = express.Router();

rentalsRoutes.post(
  '/rentals',
  rentalsMiddlewares.verifyRental,
  rentalsMiddlewares.verifyRelation,
  rentalsMiddlewares.verifyStock,
  rentalsController.makeRental
);

export default rentalsRoutes;
