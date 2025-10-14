import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
export class registration extends Model {
    // registration belongsTo course via course_id
    course;
    getCourse;
    setCourse;
    createCourse;
    // registration belongsTo user via user_id
    user;
    getUser;
    setUser;
    createUser;
    static initModel(sequelize) {
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
//# sourceMappingURL=registration.js.map