import { rentalsModel } from '../models/index.js';

export const makeRental = async (req, res) => {
  const { game, rental } = res.locals;
  const rentalDB = {
    ...rental,
    returnDate: null,
    delayFee: null,
    originalPrice: rental.daysRented * game.pricePerDay,
    rentDate: new Date().toISOString().substring(0, 10),
  };
  try {
    await rentalsModel.createNewRental(rentalDB);
    return res.status(201).send('Aluguel cadastrado!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao criar o aluguel.');
  }
};

export const retrieveAllRentals = async (req, res) => {
  const { customerId, gameId } = res.locals;
  try {
    const rentals = await rentalsModel.getRentals(customerId, gameId);
    return res.json(rentals);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar os aluguéis.');
  }
};
