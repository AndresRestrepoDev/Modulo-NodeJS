import express from "express";
import { register, login } from "../controllers/authentication.ts";
import { registerSchema, loginSchema } from "../middleware/schemas/schemas.ts";
import { validateSchema } from "../middleware/validateSchema.ts";

const AutRouter = express.Router();

AutRouter.post("/register", validateSchema(registerSchema), register);
AutRouter.post("/login", validateSchema(loginSchema), login);

export default AutRouter;
