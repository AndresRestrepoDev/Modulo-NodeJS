import { DataTypes, Model, type Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

interface IbookAtributtes {
    id_book: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn?: string;
    language?: string;
    cover_url?: string;
    owner_id?: number;
    status?: string;
    created_at?: Date;
}

export interface IbookAdd extends Optional<IbookAtributtes, 'id_book' | 'isbn' | 'language' | 'cover_url' |'owner_id' | 'status' | 'created_at'>{};

export class book extends Model<IbookAtributtes, IbookAdd>{};

book.init(
    {
        id_book: {
            type: DataTypes.INTEGER,                        
            autoIncrement: true,                              
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        language: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        cover_url: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        owner_id: {
            type: DataTypes.NUMBER,
            references: {model: 'user', key: 'id_user' },
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'available',
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        sequelize,
        tableName: 'libros',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    }
)