import { gamesModel, categoriesModel } from '../models/index.js';

export const verifyGameInfos = (req, res, next) => {
  const validation = gamesModel.gameSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send('Objeto jogo passado não é válido.');
  }

  res.locals.game = validation.value;
  next();
  return true;
};

export const verifyExistingCategory = async (req, res, next) => {
  const { categoryId } = res.locals.game;
  try {
    const existingCategory = await categoriesModel.getCategoryById(categoryId);
    if (!existingCategory) {
      return res.status(400).send('Essa categoria não existe.');
    }

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pela categoria.');
  }
};

export const verifyExistingGame = async (req, res, next) => {
  const { name } = res.locals.game;
  try {
    const existingGame = await gamesModel.getGameByName(name);
    if (existingGame) {
      return res.status(409).send('Esse jogo já existe.');
    }

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pelo jogo.');
  }
};

export const verifyQueries = (req, res, next) => {
  const { name } = req.query;
  const validation = gamesModel.nameQuerySchema.validate(name);
  if (validation.error) {
    res.locals.name = '';
  } else {
    res.locals.name = validation.value;
  }

  next();
  return true;
};
