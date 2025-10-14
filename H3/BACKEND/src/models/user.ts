import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { registration, registrationId } from './registration.ts';

export interface userAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "created_at" | "updated_at";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare created_at?: Date;
  declare updated_at?: Date;

  // user hasMany registration via user_id
  registrations!: registration[];
  getRegistrations!: Sequelize.HasManyGetAssociationsMixin<registration>;
  setRegistrations!: Sequelize.HasManySetAssociationsMixin<registration, registrationId>;
  addRegistration!: Sequelize.HasManyAddAssociationMixin<registration, registrationId>;
  addRegistrations!: Sequelize.HasManyAddAssociationsMixin<registration, registrationId>;
  createRegistration!: Sequelize.HasManyCreateAssociationMixin<registration>;
  removeRegistration!: Sequelize.HasManyRemoveAssociationMixin<registration, registrationId>;
  removeRegistrations!: Sequelize.HasManyRemoveAssociationsMixin<registration, registrationId>;
  hasRegistration!: Sequelize.HasManyHasAssociationMixin<registration, registrationId>;
  hasRegistrations!: Sequelize.HasManyHasAssociationsMixin<registration, registrationId>;
  countRegistrations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "users_email_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
