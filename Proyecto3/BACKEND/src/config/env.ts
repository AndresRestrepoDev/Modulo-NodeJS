import 'dotenv/config';

/*En una variable ENV tengo un diccionario con todas las variables de entorno ya 
previamente  cargadas*/
export const ENV = {
    PORT: Number(process.env.PORT || 3002),
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: Number(process.env.DB_PORT || 5432),
    DB_USER: process.env.DB_USER!,
    DB_NAME: process.env.DB_NAME!,
    DB_PASSWORD: process.env.DB_PASSWORD!,
}