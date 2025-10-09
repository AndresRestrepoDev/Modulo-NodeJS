import { User } from "./users.ts";
import { Event } from "./events.ts";
import { Registration } from "./registrations.ts";

export const initModels = () =>{
User.hasMany(Event, { foreignKey: 'organizer_id' });
    Event    .belongsTo(User, { foreignKey: 'organizer_id' });

    User.hasMany(Registration, { foreignKey: 'user_id' });
    Registration.belongsTo(User, { foreignKey: 'user_id' });

    Event.hasMany(Registration, { foreignKey: 'event_id' });
    Registration.belongsTo(Event, { foreignKey: 'event_id' });
} 


