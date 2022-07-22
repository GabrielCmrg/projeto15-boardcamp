import { categoriesModel } from '../models/index.js';

export const registerCategory = async (req, res) => {
  const { category } = res.locals;
  try {
    await categoriesModel.createNewCategory(category);
    return res.status(201).send('Nova categoria criada!');
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send('Algo deu errado ao tentar cadastrar a categoria.');
  }
};
