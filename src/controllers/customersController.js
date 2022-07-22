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

export const retrieveCustomer = async (req, res) => {
  const { customerId } = res.locals;
  const customer = await customersModel.getCustomerById(customerId);
  if (!customer) {
    return res.status(404).send('O id informado não corresponde a um cliente.');
  }

  return res.json(customer);
};
