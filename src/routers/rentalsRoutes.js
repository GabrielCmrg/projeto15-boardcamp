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
rentalsRoutes.get(
  '/rentals',
  rentalsMiddlewares.verifyQueries,
  rentalsController.retrieveAllRentals,
  rentalsMiddlewares.parseRentals
);
rentalsRoutes.post(
  '/rentals/:rentalId/return',
  rentalsMiddlewares.verifyParams,
  rentalsMiddlewares.verifyExistingRent,
  rentalsMiddlewares.verifyClosedRent,
  rentalsController.closeRent
);
rentalsRoutes.delete(
  '/rentals/:rentalId',
  rentalsMiddlewares.verifyParams,
  rentalsMiddlewares.verifyExistingRent,
  rentalsMiddlewares.verifyOpenRent,
  rentalsController.clearRent
);

export default rentalsRoutes;
