import type { Request, Response } from "express";
import { getEventsService, getEventByIdService, postEventService, putEventService, deleteEventService } from "../services/event.service.ts";
import { sendSuccess, sendError } from "../utils/httpResponse.ts";
import type { Event } from "../models/events.ts";

export const getEvent = async (_req: Request, res: Response) => {
  try {
    const events = await getEventsService();
    return sendSuccess<Event[]>(res, 200, "Events fetched successfully", events);
  } catch (error) {
    console.error("[EventController] Error fetching events:", error);
    return sendError(res, 500, "Error fetching events", (error as Error).message);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await getEventByIdService(Number(req.params.id));
    if (!event)
      return sendError(res, 404, "Event not found");

    return sendSuccess<Event>(res, 200, "Event fetched successfully", event);
  } catch (error) {
    console.error("[EventController] Error fetching event:", error);
    return sendError(res, 500, "Error fetching event", (error as Error).message);
  }
};

export const postEvent = async (req: Request, res: Response) => {
  try {
    const event = await postEventService(req.body);
    return sendSuccess<Event>(res, 201, "Event created successfully", event);
  } catch (error) {
    console.error("[EventController] Error creating event:", error);
    return sendError(res, 500, "Error creating event", (error as Error).message);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const success = await deleteEventService(Number(req.params.id));
    if (!success)
      return sendError(res, 404, "Event not found");

    return sendSuccess(res, 200, "Event deleted successfully");
  } catch (error) {
    console.error("[EventController] Error deleting event:", error);
    return sendError(res, 500, "Error deleting event", (error as Error).message);
  }
};

export const putEvent = async (req: Request, res: Response) => {
  try {
    const event = await putEventService(Number(req.params.id), req.body);
    if (!event)
      return sendError(res, 404, "Event not found");

    return sendSuccess<Event>(res, 200, "User updated successfully", event);
  } catch (error) {
    console.error("[EventController] Error updating event:", error);
    return sendError(res, 500, "Error updating event", (error as Error).message);
  }
};



