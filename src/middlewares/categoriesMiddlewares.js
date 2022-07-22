import { categoriesModel } from '../models/index.js';

export const verifyCategory = (req, res, next) => {
  const validation = categoriesModel.categorySchema.validate(req.body);
  if (validation.error) {
    return res.status(400).send('Objeto categoria passado não é válido.');
  }

  res.locals.category = validation.value;
  next();
  return true;
};

export const verifyExistingCategory = async (req, res, next) => {
  const { name } = res.locals.category;
  try {
    const existingCategory = await categoriesModel.getCategoryByName(name);
    if (existingCategory) {
      return res.status(409).send('Essa categoria já existe.');
    }

    next();
    return true;
  } catch (error) {
    console.error(error);
    return res.status(500).send('Algo deu errado ao buscar pela categoria.');
  }
};
