import type { Request, Response } from "express";
import {getUsersService, getUserByIdService, postUserService, deleteUserService, putUserService} from "../services/user.service.ts";
import { sendSuccess, sendError } from "../utils/httpResponse.ts";
import type { User } from "../models/users.ts"; 

import { searchRoleServices } from "../services/user.service.ts";
import { error } from "console";
import { createLog } from "../services/log.service.ts";


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersService();
    return sendSuccess<User[]>(res, 200, "Users fetched successfully", users);
  } catch (error) {
    console.error("[UserController] Error fetching users:", error);
    return sendError(res, 500, "Error fetching users", (error as Error).message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    if (!user)
      return sendError(res, 404, "User not found");

    return sendSuccess<User>(res, 200, "User fetched successfully", user);
  } catch (error) {
    console.error("[UserController] Error fetching user:", error);
    return sendError(res, 500, "Error fetching user", (error as Error).message);
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const admin = (req as any).user;
    const user = await postUserService(req.body);

    await createLog("Creó un usuario", admin.id, `Usuario: "${user.name}"`);
    return sendSuccess<User>(res, 201, "User created successfully", user);
  } catch (error) {
    console.error("[UserController] Error creating user:", error);
    return sendError(res, 500, "Error creating user", (error as Error).message);
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;

    const success = await deleteUserService(Number(req.params.id));
    if (!success) { return sendError(res, 404, "User not found"); }

    await createLog("Eliminó un usuario", admin.id, `Usuario ID: ${id}`);
    return sendSuccess(res, 200, "User deleted successfully");
  } catch (error) {
    console.error("[UserController] Error deleting user:", error);
    return sendError(res, 500, "Error deleting user", (error as Error).message);
  }
};

export const putUsers = async (req: Request, res: Response) => {
  try {
    const admin = (req as any).user;
    const { id } = req.params;

    const user = await putUserService(Number(req.params.id), req.body);
    if (!user) { return sendError(res, 404, "User not found"); }

    await createLog("Actualizó un usuario", admin.id, `Usuario ID: ${id}`);
    return sendSuccess<User>(res, 200, "User updated successfully", user);
  } catch (error) {
    console.error("[UserController] Error updating user:", error);
    return sendError(res, 500, "Error updating user", (error as Error).message);
  }
};


// consultas avanzadas
export const searchRoleController = async (req: Request, res: Response) => {
  const { rol } = req.params;

  if(!rol){ throw error }

  try {
    const users = await searchRoleServices(rol);
    res.json(users);
  } catch (error) {
    console.error('[UserController] Error fetching future users of role:', error);
    res.status(500).json({ message: 'Error obteniendo usuarios por roles' });
  }
}
