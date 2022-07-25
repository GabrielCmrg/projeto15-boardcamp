import { customersModel, gamesModel, rentalsModel } from '../models/index.js';

export const verifyRental = (req, res, next) => {
  const validation = rentalsModel.rentalSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send('Objeto aluguel enviado não é válido.');
  }

  res.locals.rental = validation.value;
  next();
  return true;
};

export const verifyRelation = async (req, res, next) => {
  const { rental } = res.locals;
  try {
    const existingGame = await gamesModel.getGameById(rental.gameId);
    const existingCustomer = await customersModel.getCustomerById(
      rental.customerId
    );
    if (!existingCustomer || !existingGame) {
      return res
        .status(400)
        .send('O jogo ou o cliente pedido não está no banco.');
    }

    res.locals.game = existingGame;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao buscar pelo jogo ou cliente.');
  }
};

export const verifyStock = async (req, res, next) => {
  const { game } = res.locals;
  try {
    const gameRentals = await rentalsModel.getOpenRentals(game.id);
    if (game.stockTotal <= gameRentals.length) {
      return res.status(400).send('Não existe mais esse jogo em estoque.');
    }

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar os aluguéis.');
  }
};

export const verifyQueries = (req, res, next) => {
  const { customerId, gameId } = req.query;
  const customerValidation =
    rentalsModel.customerIdQuerySchema.validate(customerId);
  const gameValidation = rentalsModel.gameIdQuerySchema.validate(gameId);
  res.locals.customerId = customerValidation.error
    ? 0
    : customerValidation.value;
  res.locals.gameId = gameValidation.error ? 0 : gameValidation.value;

  next();
  return true;
};

export const verifyParams = (req, res, next) => {
  const { rentalId } = req.params;
  const validation = rentalsModel.rentalIdParamSchema.validate(rentalId);
  res.locals.rentalId = validation.error ? 0 : validation.value;

  next();
  return true;
};

export const verifyExistingRent = async (req, res, next) => {
  const { rentalId } = res.locals;
  try {
    const existingRent = await rentalsModel.getRentalById(rentalId);
    if (!existingRent) {
      return res.status(404).send('O aluguel informado não existe.');
    }

    res.locals.rent = existingRent;
    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar os aluguéis.');
  }
};

export const verifyClosedRent = (req, res, next) => {
  const { rent } = res.locals;
  if (rent.returnDate) {
    return res.status(400).send('Esse aluguel já foi finalizado.');
  }

  next();
  return true;
};
