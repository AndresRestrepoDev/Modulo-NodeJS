import * as Sequelize from 'sequelize';
import { Model, type Optional } from 'sequelize';
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
export declare class course extends Model<courseAttributes, courseCreationAttributes> implements courseAttributes {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    status?: boolean;
    created_at?: Date;
    updated_at?: Date;
    registrations: registration[];
    getRegistrations: Sequelize.HasManyGetAssociationsMixin<registration>;
    setRegistrations: Sequelize.HasManySetAssociationsMixin<registration, registrationId>;
    addRegistration: Sequelize.HasManyAddAssociationMixin<registration, registrationId>;
    addRegistrations: Sequelize.HasManyAddAssociationsMixin<registration, registrationId>;
    createRegistration: Sequelize.HasManyCreateAssociationMixin<registration>;
    removeRegistration: Sequelize.HasManyRemoveAssociationMixin<registration, registrationId>;
    removeRegistrations: Sequelize.HasManyRemoveAssociationsMixin<registration, registrationId>;
    hasRegistration: Sequelize.HasManyHasAssociationMixin<registration, registrationId>;
    hasRegistrations: Sequelize.HasManyHasAssociationsMixin<registration, registrationId>;
    countRegistrations: Sequelize.HasManyCountAssociationsMixin;
    static initModel(sequelize: Sequelize.Sequelize): typeof course;
}
//# sourceMappingURL=course.d.ts.map