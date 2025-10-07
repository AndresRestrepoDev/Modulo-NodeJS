import { Router } from "express";
import { getUsers, getUserById, postUser, deleteUsers, putUsers } from "../controllers/user.controller.ts";

import { searchRoleController } from "../controllers/user.controller.ts";
import { verifyRole } from "../middleware/verificacionJWT.ts";
import { verifyToken } from "../middleware/verificacionJWT.ts";

const UserRouter = Router();

UserRouter.get('/role/:rol', searchRoleController);

UserRouter.get("/", verifyToken, verifyRole("admin"), getUsers);
UserRouter.get('/:id', verifyToken, verifyRole("admin"), getUserById);
UserRouter.post("/", verifyToken, verifyRole("admin"), postUser);
UserRouter.put("/:id", verifyToken, verifyRole("admin"), putUsers);
UserRouter.delete("/:id", verifyToken, verifyRole("admin"), deleteUsers);

export default UserRouter;
