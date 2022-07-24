import { gamesModel } from '../models/index.js';

export const registerNewGame = async (req, res) => {
  const { game } = res.locals;
  try {
    await gamesModel.createNewGame(game);
    return res.status(201).send('Jogo cadastrado!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao tentar cadastrar o jogo.');
  }
};

export const retrieveAllGames = async (req, res) => {
  const { name } = res.locals;
  try {
    const games = await gamesModel.getGames(name);
    return res.json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pelos jogos.');
  }
};
