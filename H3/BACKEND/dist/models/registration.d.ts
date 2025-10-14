import * as Sequelize from 'sequelize';
import { Model, type Optional } from 'sequelize';
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
export declare class registration extends Model<registrationAttributes, registrationCreationAttributes> implements registrationAttributes {
    id: number;
    user_id: number;
    course_id: number;
    enrollment_date?: Date;
    course: course;
    getCourse: Sequelize.BelongsToGetAssociationMixin<course>;
    setCourse: Sequelize.BelongsToSetAssociationMixin<course, courseId>;
    createCourse: Sequelize.BelongsToCreateAssociationMixin<course>;
    user: user;
    getUser: Sequelize.BelongsToGetAssociationMixin<user>;
    setUser: Sequelize.BelongsToSetAssociationMixin<user, userId>;
    createUser: Sequelize.BelongsToCreateAssociationMixin<user>;
    static initModel(sequelize: Sequelize.Sequelize): typeof registration;
}
//# sourceMappingURL=registration.d.ts.map