import { customersModel } from '../models/index.js';

export const registerNewCustomer = async (req, res) => {
  const { customer } = res.locals;
  try {
    await customersModel.createNewCustomer(customer);
    return res.status(201).send('Novo cliente cadastrado!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao cadastrar o usuário.');
  }
};

export const retrieveAllCustomers = async (req, res, next) => {
  const { cpf } = res.locals;
  try {
    const customers = await customersModel.getCustomers(cpf);
    res.locals.customers = customers;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar os clientes.');
  }
};

export const retrieveCustomer = async (req, res, next) => {
  const { customerId } = res.locals;
  try {
    const customer = await customersModel.getCustomerById(customerId);
    if (!customer) {
      return res
        .status(404)
        .send('O id informado não corresponde a um cliente.');
    }

    res.locals.customer = customer;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar o cliente.');
  }
};

export const updateCustomer = async (req, res) => {
  const { customer, customerId } = res.locals;
  try {
    const updated = await customersModel.replaceCustomerById(
      customer,
      customerId
    );
    if (updated) {
      return res.send('Cadastro do cliente atualizado!');
    }

    return res.status(404).send('O id informado não corresponde a um cliente.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao atualizar o cadastro.');
  }
};
