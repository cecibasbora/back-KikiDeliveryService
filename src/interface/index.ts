import express from 'express';
import cors from 'cors';
import { main } from '../infrastructure/connection'
import { configureDependencies } from '../infrastructure/utils/config';
import dotenv from 'dotenv'
dotenv.config();

export const app = express();
main();
app.use(express.json());
app.use(cors());

const { deliveryController } = configureDependencies();

app.post('/', (req, res) => deliveryController.create(req, res));
app.get('/entregas/:userId', (req, res) => deliveryController.getAll(req, res));
app.delete("/entregas/:id", (req, res) => deliveryController.delete(req, res))

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  })
}