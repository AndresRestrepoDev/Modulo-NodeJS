import * as Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';
import type { course, courseId } from './course.ts';
import type { user, userId } from './user.ts';

export interface registrationAttributes {
  id: number;
  user_id: number;
  course_id: number;
  enrollment_date?: Date;
}

export type registrationPk = "id";
export type registrationId = registration[registrationPk];
export type registrationOptionalAttributes = "id" | "enrollment_date";
export type registrationCreationAttributes = Optional<registrationAttributes, registrationOptionalAttributes>;

export class registration extends Model<registrationAttributes, registrationCreationAttributes> implements registrationAttributes {
  declare id: number;
  declare user_id: number;
  declare course_id: number;
  declare enrollment_date?: Date;

  // registration belongsTo course via course_id
  course!: course;
  getCourse!: Sequelize.BelongsToGetAssociationMixin<course>;
  setCourse!: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
  createCourse!: Sequelize.BelongsToCreateAssociationMixin<course>;
  // registration belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof registration {
    return registration.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "unique_registration"
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      },
      unique: "unique_registration"
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'registrations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "registrations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_registration",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "course_id" },
        ]
      },
    ]
  });
  }
}
