import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models.ts';
import 'dotenv/config';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    console.error("[ENV] Las variables de entorno de la base de datos deben estar definidas.");
    
    process.exit(1); 
}

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD, 
  {
    host: DB_HOST,
    port: Number(DB_PORT),
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

// npx sequelize-auto -o "./src/models" -d academy_db -h localhost -u postgres -p 5432 -x 'Riwi123*' -e postgres -l ts --camel --singularize
