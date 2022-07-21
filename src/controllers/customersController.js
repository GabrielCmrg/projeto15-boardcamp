import { customersModel } from '../models/index.js';

export const registerNewCustomer = async (req, res) => {
  const { customer } = res.locals;
  await customersModel.createNewCustomer(customer);
  return res.status(201).send('Novo cliente cadastrado!');
};
