import { customersModel } from '../models/index.js';

export const registerNewCustomer = async (req, res) => {
  const { customer } = res.locals;
  await customersModel.createNewCustomer(customer);
  return res.status(201).send('Novo cliente cadastrado!');
};

export const retrieveAllCustomers = async (req, res) => {
  const { cpf } = res.locals;
  const customers = await customersModel.getCustomers(cpf);
  return res.json(customers);
};
