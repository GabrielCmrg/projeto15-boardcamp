import joi from 'joi';

import { connection } from './index.js';

export const categorySchema = joi.object({
  name: joi.string().lowercase().trim().required(),
});

export const getCategoryByName = async (name) => {
  const { rows: category } = await connection.query(
    'SELECT * FROM categories WHERE name = $1',
    [name]
  );
  return category[0];
};

export const createNewCategory = async (category) => {
  const { name } = category;
  await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
};

export const getCategories = async () => {
  const { rows: categories } = await connection.query(
    'SELECT * FROM categories'
  );
  return categories;
};

export const getCategoryById = async (categoryId) => {
  const { rows: category } = await connection.query(
    'SELECT * FROM categories WHERE id = $1',
    [categoryId]
  );
  return category[0];
};
