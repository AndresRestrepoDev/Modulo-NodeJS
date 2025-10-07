// src/middlewares/verifyEventOwner.ts
import type { Request, Response, NextFunction } from "express";
import { Event } from "../models/events.ts";

export const verifyEventOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user; // agregado por verifyToken
    const { id } = req.params; // id del evento

    // Buscar el evento
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Evento no encontrado",
      });
    }

    // Comparar organizer_id con el id del usuario autenticado
    if (event.organizer_id !== user.id) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para modificar este evento",
      });
    }

    // Guardamos el evento por si el controlador lo necesita
    (req as any).event = event;

    next();
  } catch (error) {
    console.error("[verifyEventOwner] Error:", error);
    res.status(500).json({
      success: false,
      message: "Error verificando propiedad del evento",
    });
  }
};
