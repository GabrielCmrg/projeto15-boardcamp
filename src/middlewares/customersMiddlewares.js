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
  const existingCustomer = await customersModel.getCustomerByCPF(cpf);
  if (existingCustomer) {
    return res
      .status(409)
      .send('Já existe um cliente cadastrado com esse CPF.');
  }

  next();
  return true;
};

export const verifyQueries = (req, res, next) => {
  const { cpf } = req.query;
  const validation = customersModel.cpfQuerySchema.validate(cpf);
  if (validation.error) {
    res.locals.cpf = '';
    next();
    return true;
  }

  res.locals.cpf = validation.value;
  next();
  return true;
};

export const verifyParams = (req, res, next) => {
  const customerId = parseInt(req.params.customerId, 10);
  if (Number.isNaN(customerId)) {
    res.locals.customerId = 0;
  } else {
    res.locals.customerId = customerId;
  }

  next();
  return true;
};
