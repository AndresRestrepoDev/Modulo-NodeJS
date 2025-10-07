import { Router } from "express";
import { getEvent, getEventById, postEvent, deleteEvent, putEvent } from "../controllers/event.controller.ts";
import { searchController } from "../controllers/event.controller.ts";
import { getFutureEventsController } from "../controllers/event.controller.ts";

import { eventSchema  } from "../middleware/schemas/schemas.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { verifyRole } from "../middleware/verificacionJWT.ts";
import { verifyToken } from "../middleware/verificacionJWT.ts";
import { verifyEventOwner } from "../middleware/verifyOwner.ts";

const EventRouter = Router();

EventRouter.get('/search/:keyword', searchController); //http://localhost:3002/event/search/:keyword
EventRouter.get('/future', getFutureEventsController);

EventRouter.get("/", getEvent); // cualquiera puede ver
EventRouter.get('/:id', getEventById);
EventRouter.post("/", validateSchema(eventSchema), verifyToken, verifyEventOwner, postEvent);
EventRouter.put("/:id", verifyToken, verifyEventOwner, putEvent);
EventRouter.delete("/:id", verifyToken, verifyEventOwner, deleteEvent);

export default EventRouter;
