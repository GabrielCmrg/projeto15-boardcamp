import { customersModel } from '../models/index.js';

export const verifyCustomerInfos = (req, res, next) => {
  const validation = customersModel.customersSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send('Objeto cliente passado não é válido.');
  }

  res.locals.customer = validation.value;
  next();
  return true;
};

export const verifyExistingCustomerCPF = async (req, res, next) => {
  const { cpf } = res.locals.customer;
  const { customerId } = res.locals;
  try {
    const existingCustomer = await customersModel.getCustomerByCPF(cpf);
    if (existingCustomer && existingCustomer.id !== customerId) {
      return res
        .status(409)
        .send('Já existe um cliente cadastrado com esse CPF.');
    }

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pelo cliente.');
  }
};

export const verifyQueries = (req, res, next) => {
  const { cpf } = req.query;
  const validation = customersModel.cpfQuerySchema.validate(cpf);
  res.locals.cpf = validation.error ? '' : validation.value;

  next();
  return true;
};

export const verifyParams = (req, res, next) => {
  const { customerId } = req.params;
  const validation = customersModel.customerIdParamSchema.validate(customerId);
  res.locals.customerId = validation.error ? 0 : validation.value;

  next();
  return true;
};

export const parseCustomer = (req, res) => {
  const { customer } = res.locals;
  customer.birthday = customer.birthday.toISOString().substring(0, 10);
  return res.json(customer);
};

export const parseCustomers = (req, res) => {
  const { customers } = res.locals;
  const parsedCustomers = customers.map((customer) => ({
    ...customer,
    birthday: customer.birthday.toISOString().substring(0, 10),
  }));
  return res.json(parsedCustomers);
};
