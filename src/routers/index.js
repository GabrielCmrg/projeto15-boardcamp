import express from 'express';

import customersRoutes from './customersRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';
import gamesRoutes from './gamesRoutes.js';

const router = express.Router();
router.use(customersRoutes);
router.use(categoriesRoutes);
router.use(gamesRoutes);

export default router;
