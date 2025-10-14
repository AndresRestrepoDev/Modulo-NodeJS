import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
export class course extends Model {
    // course hasMany registration via course_id
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
//# sourceMappingURL=course.js.map