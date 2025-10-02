import type { Request, Response } from 'express';
import usuario from '../models/usuario.ts'

export const createUser = async (req: Request, res: Response) => {
    const { name, last_name, email, password, phone, address } = req.body;
    const user = await usuario.create({ name, last_name, email, password, phone, address});
    res.json(user);
}

export const getUser = async (_req: Request, res: Response) => {
    const users = await usuario.findAll();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await usuario.findByPk(req.params.id);
    if (!user) return res.status(404).json({message: "User no found"})
    return res.json(user)   
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, last_name, email, password, phone, address } = req.body;
    
    const updateFields = { name, last_name, email, password, phone, address };

    const user = await usuario.findByPk(id);

    if (user) {
        const updatedUser = await user.update(updateFields); 
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: "user no found" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await usuario.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}


