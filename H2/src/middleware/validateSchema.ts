// src/middlewares/validateSchema.ts
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateSchema = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // devolvemos errores de forma sencilla sin complicar el tipado
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: result.error.issues, // ✅ más simple y recomendado por Zod
      });
    }

    req.body = result.data; // ✅ datos ya validados
    next();
  };
};

