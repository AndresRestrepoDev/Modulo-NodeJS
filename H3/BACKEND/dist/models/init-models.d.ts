import type { Sequelize } from "sequelize";
import { course as _course } from "./course.ts";
import type { courseAttributes, courseCreationAttributes } from "./course.ts";
import { registration as _registration } from "./registration.ts";
import type { registrationAttributes, registrationCreationAttributes } from "./registration.ts";
import { user as _user } from "./user.ts";
import type { userAttributes, userCreationAttributes } from "./user.ts";
export { _course as course, _registration as registration, _user as user, };
export type { courseAttributes, courseCreationAttributes, registrationAttributes, registrationCreationAttributes, userAttributes, userCreationAttributes, };
export declare function initModels(sequelize: Sequelize): {
    course: typeof _course;
    registration: typeof _registration;
    user: typeof _user;
};
//# sourceMappingURL=init-models.d.ts.map