import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log('App running on port: ' + PORT);
});