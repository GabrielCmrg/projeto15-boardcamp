import Joi from 'joi';
import joiDate from '@joi/date';

import { connection } from './index.js';

const joi = Joi.extend(joiDate);

export const customersSchema = joi.object({
  name: joi.string().trim().required(),
  phone: joi
    .string()
    .trim()
    .pattern(/[0-9]{10,11}/)
    .required(),
  cpf: joi
    .string()
    .trim()
    .pattern(/[0-9]{11}/)
    .required(),
  birthday: joi.date().format('YYYY-MM-DD').raw().required(),
});

export const cpfQuerySchema = joi
  .string()
  .trim()
  .pattern(/[0-9]{1,11}/)
  .required();

export const customerIdParamSchema = joi.number().greater(0).required();

export const createNewCustomer = async (customer) => {
  const { name, phone, cpf, birthday } = customer;
  await connection.query(
    'INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
    [name, phone, cpf, birthday]
  );
};

export const getCustomerByCPF = async (cpf) => {
  const { rows: customer } = await connection.query(
    'SELECT * FROM customers WHERE cpf = $1',
    [cpf]
  );
  return customer[0];
};

export const getCustomers = async (cpf) => {
  const { rows: customers } = await connection.query(
    'SELECT * FROM customers WHERE cpf LIKE $1',
    [`${cpf}%`]
  );
  return customers;
};

export const getCustomerById = async (customerId) => {
  const { rows: customer } = await connection.query(
    'SELECT * FROM customers WHERE id = $1',
    [customerId]
  );
  return customer[0];
};

export const replaceCustomerById = async (customer, customerId) => {
  const { name, phone, cpf, birthday } = customer;
  const result = await connection.query(
    'UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5',
    [name, phone, cpf, birthday, customerId]
  );
  return result.rowCount;
};
