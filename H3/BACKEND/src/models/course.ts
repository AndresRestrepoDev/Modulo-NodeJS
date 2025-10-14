import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { registration, registrationId } from './registration.ts';

export interface courseAttributes {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type coursePk = "id";
export type courseId = course[coursePk];
export type courseOptionalAttributes = "id" | "description" | "status" | "created_at" | "updated_at";
export type courseCreationAttributes = Optional<courseAttributes, courseOptionalAttributes>;

export class course extends Model<courseAttributes, courseCreationAttributes> implements courseAttributes {
  declare id: number;
  declare title: string;
  declare description?: string;
  declare start_date: string;
  declare status?: boolean;
  declare created_at?: Date;
  declare updated_at?: Date;

  // course hasMany registration via course_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof course {
    return course.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'courses',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "courses_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
