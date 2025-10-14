import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/academy_logs';

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[MongoDB] Conexión exitosa');
  } catch (error) {
    console.error('[MongoDB] Error al conectar:', error);
    process.exit(1);
  }
};
