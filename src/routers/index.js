import express from 'express';

import customersRoutes from './customersRoutes.js';
import categoriesRoutes from './categoriesRoutes.js';

const router = express.Router();
router.use(customersRoutes);
router.use(categoriesRoutes);

export default router;
