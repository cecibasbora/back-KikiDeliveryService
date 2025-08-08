import mongoose from 'mongoose';
import dotenv from 'dotenv'
// import { DeliveryModel } from './model';
dotenv.config();

export const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Servidor online!');
    
    // const result = await DeliveryModel.updateMany(
    //   { isDeleted: { $in: [null, undefined] } },
    //   { $set: { isDeleted: false } }
    // );
    // console.log(`Data backfilling completo. Foram atualizadas ${result.modifiedCount} entregas.`);
  } catch (error) {
    console.error('Erro: ', error);
  }
}