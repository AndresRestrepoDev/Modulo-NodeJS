import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models.ts';
import 'dotenv/config'

const sequelize = new Sequelize(
  process.env.DB_NAME! as string,
  process.env.DB_USER! as string,
  process.env.DB_PASSWORD! as string,
  {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true,
    }
  }
);

const models = initModels(sequelize);

export { sequelize, models };

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('[DB] Error al conectar a la base de datos:', error);
  }
};
