import type { Request, Response } from 'express';
import { models } from '../config/database.ts';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.ts';

const { users } = models;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await users.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El correo ya está registrado' });

    const hashed = await hashPassword(password);
    const user = await users.create({ name, email, password: hashed, role });

    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesion', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
