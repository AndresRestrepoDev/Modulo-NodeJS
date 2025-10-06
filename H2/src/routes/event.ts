import { Router } from "express";
import { getEvent, getEventById, postEvent, deleteEvent, putEvent } from "../controllers/event.controller.ts";


const EventRouter = Router();

EventRouter.get('/', getEvent);
EventRouter.get('/:id', getEventById);
EventRouter.post('/', postEvent);
EventRouter.put('/:id', putEvent);
EventRouter.delete('/:id', deleteEvent);


export default EventRouter;
