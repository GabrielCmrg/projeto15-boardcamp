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

export const retrieveAllRentals = async (req, res, next) => {
  const { customerId, gameId } = res.locals;
  try {
    const rentals = await rentalsModel.getRentals(customerId, gameId);
    res.locals.rentals = rentals;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar os aluguéis.');
  }
};

export const closeRent = async (req, res) => {
  const { rent } = res.locals;

  const today = new Date();
  const midnightToday = new Date(today.setHours(0, 0, 0, 0));
  rent.returnDate = midnightToday.toISOString().substring(0, 10);

  const rentDay = new Date(rent.rentDate);
  const delayInMs = midnightToday.getTime() - rentDay.getTime();
  const delayInSecs = Math.floor(delayInMs / 1000);
  const delayInMins = Math.floor(delayInSecs / 60);
  const delayInHours = Math.floor(delayInMins / 60);
  const delayInDays = Math.floor(delayInHours / 24);
  rent.delayFee = delayInDays * (rent.originalPrice / rent.daysRented);

  try {
    await rentalsModel.replaceRent(rent);
    return res.send('Aluguel finalizado!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao finalizar o aluguel');
  }
};

export const clearRent = async (req, res) => {
  const { rentalId } = res.locals;
  try {
    await rentalsModel.deleteRentById(rentalId);
    return res.send('Aluguel apagado!');
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao apagar o registro do aluguel.');
  }
};
