import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
export class user extends Model {
    // user hasMany registration via user_id
    registrations;
    getRegistrations;
    setRegistrations;
    addRegistration;
    addRegistrations;
    createRegistration;
    removeRegistration;
    removeRegistrations;
    hasRegistration;
    hasRegistrations;
    countRegistrations;
    static initModel(sequelize) {
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
//# sourceMappingURL=user.js.map