import joi from 'joi';
import { connection } from './index.js';

export const rentalSchema = joi.object({
  customerId: joi.number().integer().greater(0).required(),
  gameId: joi.number().integer().greater(0).required(),
  daysRented: joi.number().greater(0).required(),
});

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

export const getRentals = async (gameId) => {
  const { rows: rentals } = await connection.query(
    'SELECT * FROM rentals WHERE "gameId" = $1',
    [gameId]
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
