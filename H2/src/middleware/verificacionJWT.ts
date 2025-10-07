import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error("Falta la variable JWT_SECRET en el archivo .env");
}

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token no proporcionado o formato inválido",
      });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token!, JWT_SECRET);

    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error("[AuthMiddleware] Error verificando token:", error);

    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }
};

export const verifyRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para acceder a esta ruta",
      });
    }

    next();
  };
};

