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
