import joi from 'joi';
import { connection } from './index.js';

export const gameSchema = joi.object({
  name: joi.string().trim().required(),
  image: joi.string().trim().uri().required(),
  stockTotal: joi.number().integer().greater(0).required(),
  categoryId: joi.number().integer().greater(0).required(),
  pricePerDay: joi.number().integer().greater(0).required(),
});

export const getGameByName = async (name) => {
  const { rows: game } = await connection.query(
    'SELECT * FROM games WHERE name ILIKE $1',
    [name]
  );
  return game[0];
};

export const createNewGame = async (game) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = game;
  await connection.query(
    'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
    [name, image, stockTotal, categoryId, pricePerDay]
  );
};
