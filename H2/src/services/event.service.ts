import { Event } from "../models/events.ts";
import type { EventCreationAttibutes } from "../models/events.ts";
import { Op } from 'sequelize';


type OpcionalEvent = Partial<Omit<EventCreationAttibutes, 'id' | 'createdAt' | 'updatedAt' | 'organizer_id'>>;

export const getEventsService = async () => {
    return await Event.findAll();
}

export const getEventByIdService = async (id: number) => {
    return await Event.findByPk(id);
}

export const postEventService = async (body: EventCreationAttibutes) => {
    return await Event.create(body);
}

export const deleteEventService = async (id:number) => {
    const event = await Event.findByPk(id);
    if (!event) return { success: false, message: 'Event not found' };
    await event.destroy();
    return { success: true, message: 'Event deleted' };
}

export const putEventService = async (id: number, body: OpcionalEvent) => {
  const event = await Event.findByPk(id);
  if (!event) return null;
  
  await event.update(body);
  return event;
};


//consultas avanzadas

/**
 * Busca eventos por título o ubicación
 * @param keyword Palabra clave a buscar
 */
export const searchEvents = async (keyword: string) => {
  try {
    const events = await Event.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { locacion: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
      order: [['event_date', 'ASC']],
    });

    return events;
  } catch (error) {
    console.error('Error buscando eventos:', error);
    throw error;
  }
};

export const getFutureEvents = async () => {
  const today = new Date(); 

  const events = await Event.findAll({
    where: {
      event_date: {
        [Op.gt]: today, // event_date > fecha actual
      },
    },
    order: [['event_date', 'ASC']], 
  });

  return events;
};
