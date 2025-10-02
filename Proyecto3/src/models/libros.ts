import { DataTypes, DATE, Model } from "sequelize";
import sequelize from "../database/db.ts";
import type { Literal } from "sequelize/lib/utils";

class libro extends Model {}

libro.init({
    id_book:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING(20),
    },
    genre: {
        type: DataTypes.STRING(50),
    },
    language: {
        type: DataTypes.STRING(50),
    },
    cover_url: {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT,
    },
    owner_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type: DataTypes.ENUM('available', 'borrowed', 'inactive'),
        allowNull: false,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }, 
}, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    timestamps: false,
});


export default libro
