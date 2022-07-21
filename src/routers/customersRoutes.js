import express from 'express';

import { customersMiddlewares } from '../middlewares/index.js';
import { customersController } from '../controllers/index.js';

const customersRoutes = express.Router();

customersRoutes.post(
  '/customers',
  customersMiddlewares.verifyCustomerInfos,
  customersMiddlewares.verifyExistingCustomerCPF,
  customersController.registerNewCustomer
);

export default customersRoutes;
