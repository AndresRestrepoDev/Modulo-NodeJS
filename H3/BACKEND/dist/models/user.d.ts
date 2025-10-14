import * as Sequelize from 'sequelize';
import { Model, type Optional } from 'sequelize';
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
export declare class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
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
    static initModel(sequelize: Sequelize.Sequelize): typeof user;
}
//# sourceMappingURL=user.d.ts.map