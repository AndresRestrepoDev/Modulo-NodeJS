import type { Request, Response } from "express";
import { getRegistrationsService, getRegistrationByIdService, postRegistrationService, deleteRegistrationService, putRegistrationService } from "../services/registration.service.ts";
import { sendSuccess, sendError } from "../utils/httpResponse.ts";
import type { Registration } from "../models/registrations.ts";

export const getRegistrations = async (_req: Request, res: Response) => {
  try {
    const registrations = await getRegistrationsService();
    return sendSuccess<Registration[]>(res, 200, "Registrations fetched successfully", registrations);
  } catch (error) {
    console.error("[RegistrationController] Error fetching registrations:", error);
    return sendError(res, 500, "Error fetching registrations", (error as Error).message);
  }
};

export const getRegistrationById = async (req: Request, res: Response) => {
  try {
    const registration = await getRegistrationByIdService(Number(req.params.id));
    if (!registration)
      return sendError(res, 404, "Registration not found");

    return sendSuccess<Registration>(res, 200, "Registration fetched successfully", registration);
  } catch (error) {
    console.error("[RegistrationController] Error fetching registration:", error);
    return sendError(res, 500, "Error fetching registration", (error as Error).message);
  }
};

export const postRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await postRegistrationService(req.body);
    return sendSuccess<Registration>(res, 201, "Registration created successfully", registration);
  } catch (error) {
    console.error("[RegistrationController] Error creating registration:", error);
    return sendError(res, 500, "Error creating registration", (error as Error).message);
  }
};

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const success = await deleteRegistrationService(Number(req.params.id));
    if (!success)
      return sendError(res, 404, "Registration not found");

    return sendSuccess(res, 200, "Registration deleted successfully");
  } catch (error) {
    console.error("[RegistrationController] Error deleting registration:", error);
    return sendError(res, 500, "Error deleting registration", (error as Error).message);
  }
};

export const putRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await putRegistrationService(Number(req.params.id), req.body);
    if (!registration)
      return sendError(res, 404, "Registration not found");

    return sendSuccess<Registration>(res, 200, "Registration updated successfully", registration);
  } catch (error) {
    console.error("[RegistrationController] Error updating registration:", error);
    return sendError(res, 500, "Error updating registration", (error as Error).message);
  }
};
