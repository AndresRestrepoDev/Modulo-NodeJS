import { LogModel } from "../models/log.model.ts";

export const createLog = async (
  action: string,
  userId: number,
  resource: string
) => {
  try {
    await LogModel.create({
      action,
      userId,
      resource,
      date: new Date(),
    });
  } catch (error) {
    console.error("[LogService] Error registrando log:", error);
  }
};
