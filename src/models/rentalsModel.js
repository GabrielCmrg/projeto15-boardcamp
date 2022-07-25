import joi from 'joi';
import { connection } from './index.js';

export const rentalSchema = joi.object({
  customerId: joi.number().integer().greater(0).required(),
  gameId: joi.number().integer().greater(0).required(),
  daysRented: joi.number().greater(0).required(),
});

export const customerIdQuerySchema = joi.number().greater(0).required();
export const gameIdQuerySchema = joi.number().greater(0).required();

export const rentalIdParamSchema = joi.number().greater(0).required();

export const createNewRental = async (rental) => {
  const {
    customerId,
    gameId,
    daysRented,
    returnDate,
    delayFee,
    originalPrice,
    rentDate,
  } = rental;
  await connection.query(
    'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
    ]
  );
};

export const getRentals = async (customerId, gameId) => {
  const customer = customerId || 'ANY(SELECT "customerId" FROM rentals)';
  const game = gameId || 'ANY(SELECT "gameId" FROM rentals)';

  const { rows: rentals } = await connection.query(
    `
      SELECT rentals.*, row_to_json(customer) AS customer, row_to_json(game) AS game
      FROM rentals
      JOIN (
        SELECT id, name
        FROM customers
      ) AS customer
      ON rentals."customerId" = customer.id
      JOIN (
        SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName"
        FROM games
        JOIN categories
        ON categories.id = games."categoryId"
      ) AS game
      ON rentals."gameId" = game.id
      WHERE rentals."customerId" = ${customer}
      AND rentals."gameId" = ${game}
    `
  );
  return rentals;
};

export const getOpenRentals = async (gameId) => {
  const { rows: rentals } = await connection.query(
    'SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL',
    [gameId]
  );
  return rentals;
};

export const getRentalById = async (rentalId) => {
  const { rows: rental } = await connection.query(
    'SELECT * FROM rentals WHERE id = $1',
    [rentalId]
  );
  return rental[0];
};

export const replaceRent = async (rental) => {
  const {
    customerId,
    gameId,
    daysRented,
    returnDate,
    delayFee,
    originalPrice,
    rentDate,
  } = rental;
  await connection.query(
    'UPDATE rentals SET "customerId" = $1, "gameId" = $2, "rentDate" = $3, "daysRented" = $4, "returnDate" = $5, "originalPrice" = $6, "delayFee" = $7',
    [
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
    ]
  );
};

export const deleteRentById = async (rentalId) => {
  await connection.query('DELETE FROM rentals WHERE id = $1', [rentalId]);
};
