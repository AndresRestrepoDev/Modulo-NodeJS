import { Sequelize } from 'sequelize';
import 'dotenv/config';
declare const sequelize: Sequelize;
declare const models: {
    course: typeof import("../models/course.ts").course;
    registration: typeof import("../models/registration.ts").registration;
    user: typeof import("../models/user.ts").user;
};
export { sequelize, models };
export declare const connectDB: () => Promise<void>;
//# sourceMappingURL=db.d.ts.map