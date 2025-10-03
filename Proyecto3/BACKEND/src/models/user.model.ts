import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from 'sequelize';                                      
import { sequelize } from '../config/database.ts';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>
{
    declare id_user: CreationOptional<number>;
    declare name: string;
    declare last_name: string;
    declare email: string;
    declare password: string;
    declare phone: string | null; 
    declare address: string | null;
    declare role: CreationOptional<String>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
};

User.init(
    {
        id_user: {
            type: DataTypes.INTEGER,                         
            autoIncrement: true,                              
            primaryKey: true,                                 
        },
        name: {
            type: DataTypes.STRING(100),                     
            allowNull: false,                                  
        },
        last_name: {
            type: DataTypes.STRING(100),                       
            allowNull: false,                                
        },
        email: {
            type: DataTypes.STRING(150),                       
            allowNull: false,                                 
            unique: true,                                      
            validate: { isEmail: true },                       
        },
        password: {
            type: DataTypes.STRING(100),                           
            allowNull: false,                                  
        },
        phone: {
            type: DataTypes.STRING(20),                    
            allowNull: true,                                   
        },
        address: {
            type: DataTypes.STRING(100),                           
            allowNull: true,                                   
        },
        role: {
            type: DataTypes.STRING(20),                     
            allowNull: false,                                
        },
        created_at: {
            type: DataTypes.DATE,                             
            allowNull: false,                                  
        },
        updated_at: {
            type: DataTypes.DATE,                            
            allowNull: false,                              
        },
    },{
        sequelize,
        tableName: 'usuarios',
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    }
)