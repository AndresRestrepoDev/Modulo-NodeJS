import type { Request, Response } from "express";
import { User } from "../models/users.ts";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const register = async (req: Request, res: Response) => {
    try {

        const data = registerSchema.parse(req.body);

        const { name, email, password } = data
        console.log("Datos recibidos:", { name, email, password });

        const existingUser = await User.findOne({where: { email } });
        if(existingUser) { return res.status(400).json({ message: "El usuario ya existe" }); }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Usuario creado", user });

    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(400).json({
        message: "Error en el servidor",
        error: error,
        })
    }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Contraseña incorrecta" });

    if (!process.env.JWT_SECRET) {
        throw new Error("Falta la variable JWT_SECRET en el archivo .env");
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Inicio de sesión exitoso", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
