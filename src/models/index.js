import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL } = process.env;

const { Pool } = pkg;
const connection = new Pool({
  connectionString: DATABASE_URL,
});

export { connection };
export * as customersModel from './customersModel.js';
export * as categoriesModel from './categoriesModel.js';
export * as gamesModel from './gamesModel.js';
export * as rentalsModel from './rentalsModel.js';
