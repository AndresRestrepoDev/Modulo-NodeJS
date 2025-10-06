import { DataTypes, Model, type InferAttributes, type InferCreationAttributes, type CreationOptional, type ForeignKey } from "sequelize";
import { sequelize } from "../configSequelize/dbSeq.ts";
import { User } from "./users.ts";
import { Event } from "./events.ts";

export type RegistrationAttibutes = InferAttributes<Registration>;
export type RegistrationCreationAttibutes = InferCreationAttributes<Registration>;

export class Registration extends Model<RegistrationAttibutes, RegistrationCreationAttibutes> {
  declare id: CreationOptional<number>;
  declare status: CreationOptional<'pending' | 'confirmed' | 'canceled'>;
  declare user_id: ForeignKey<User['id']>;
  declare event_id: ForeignKey<Event['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Registration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'confirmed', 'canceled']],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Registration',
    tableName: 'registrations',
    timestamps: true,
  }
)