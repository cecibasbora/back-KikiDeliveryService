import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const main = async () => {
    try {
         await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Servidor online!');
    } catch (error) {
        console.log('Erro: ', error);
    }
}