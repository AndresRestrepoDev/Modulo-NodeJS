import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db.ts";

class usuarios extends Model<Iusuario, any> implements Iusuario {
    public id_user!: number; 
    public name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string; 
    public phone!: string;
    public address!: string;
    public role!: 'user' | 'admin';
    public created_at!: Date;
    public updated_at!: Date;
}

usuarios.init({
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'usuarios',
    tableName: 'usuarios',
    timestamps: false,
});

export interface Iusuario {
    id_user: number;
    name: string;
    last_name: string;
    email: string;
    password: string; 
    phone: string;
    address: string;
    role: 'user' | 'admin';
    created_at: Date;
    updated_at: Date;
}

export default usuarios;
