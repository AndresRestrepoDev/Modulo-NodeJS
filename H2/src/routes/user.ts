import { Router } from "express";
import { getUsers, getUserById, postUser, deleteUsers, putUsers } from "../controllers/user.controller.ts";

const UserRouter = Router();

UserRouter.get('/', getUsers);
UserRouter.get('/:id', getUserById);
UserRouter.post('/', postUser);
UserRouter.put('/:id', putUsers);
UserRouter.delete('/:id', deleteUsers);

export default UserRouter;
