import { Sequelize } from "sequelize";
import { ENV } from './env.ts';

//creando conexion a la base de datos
export const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: 'postgres',
    logging: false
})

export const initDB = async () => {
    try{
        await sequelize.authenticate();
        console.log('[DB] connection to the database successfully');
    } catch (error){
        console.error('[DB] connection to the database failed', error);
        throw error;
    }
}