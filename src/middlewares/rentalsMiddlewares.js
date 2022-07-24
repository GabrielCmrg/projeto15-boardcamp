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
    const gameRentals = await rentalsModel.getRentals(game.id);
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
