import express from 'express';

import { customersMiddlewares } from '../middlewares/index.js';
import { customersController } from '../controllers/index.js';

const customersRoutes = express.Router();

customersRoutes.post(
  '/customers',
  customersMiddlewares.verifyParams,
  customersMiddlewares.verifyCustomerInfos,
  customersMiddlewares.verifyExistingCustomerCPF,
  customersController.registerNewCustomer
);
customersRoutes.get(
  '/customers',
  customersMiddlewares.verifyQueries,
  customersController.retrieveAllCustomers
);
customersRoutes.get(
  '/customers/:customerId',
  customersMiddlewares.verifyParams,
  customersController.retrieveCustomer
);
customersRoutes.put(
  '/customers/:customerId',
  customersMiddlewares.verifyParams,
  customersMiddlewares.verifyCustomerInfos,
  customersMiddlewares.verifyExistingCustomerCPF,
  customersController.updateCustomer
);

export default customersRoutes;
