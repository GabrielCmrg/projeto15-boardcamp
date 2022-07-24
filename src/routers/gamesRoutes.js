import express from 'express';

import { gamesMiddlewares } from '../middlewares/index.js';
import { gamesController } from '../controllers/index.js';

const gamesRoutes = express.Router();

gamesRoutes.post(
  '/games',
  gamesMiddlewares.verifyGameInfos,
  gamesMiddlewares.verifyExistingCategory,
  gamesMiddlewares.verifyExistingGame,
  gamesController.registerNewGame
);
gamesRoutes.get(
  '/games',
  gamesMiddlewares.verifyQueries,
  gamesController.retrieveAllGames
);

export default gamesRoutes;
