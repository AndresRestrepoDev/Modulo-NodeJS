import type { Sequelize } from "sequelize";
import { course as _course } from "./course.ts";
import type { courseAttributes, courseCreationAttributes } from "./course.ts";
import { registration as _registration } from "./registration.ts";
import type { registrationAttributes, registrationCreationAttributes } from "./registration.ts";
import { user as _user } from "./user.ts";
import type { userAttributes, userCreationAttributes } from "./user.ts";

export {
  _course as course,
  _registration as registration,
  _user as user,
};

export type {
  courseAttributes,
  courseCreationAttributes,
  registrationAttributes,
  registrationCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const course = _course.initModel(sequelize);
  const registration = _registration.initModel(sequelize);
  const user = _user.initModel(sequelize);

  registration.belongsTo(course, { as: "course", foreignKey: "course_id"});
  course.hasMany(registration, { as: "registrations", foreignKey: "course_id"});
  registration.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(registration, { as: "registrations", foreignKey: "user_id"});

  return {
    course: course,
    registration: registration,
    user: user,
  };
}
