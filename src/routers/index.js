import express from 'express';

import customersRoutes from './customersRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';
import gamesRoutes from './gamesRoutes.js';
import rentalsRoutes from './rentalsRoutes.js';

const router = express.Router();
router.use(customersRoutes);
router.use(categoriesRoutes);
router.use(gamesRoutes);
router.use(rentalsRoutes);

export default router;
