import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('libreria', 'postgres', 'Riwi123*', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export default sequelize;
