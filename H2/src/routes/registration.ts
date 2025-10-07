import { Router } from "express";
import { getRegistrations, getRegistrationById, postRegistration, deleteRegistration, putRegistration } from "../controllers/registration.controller.ts";

import { registrationSchema  } from "../middleware/schemas/schemas.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { verifyRole } from "../middleware/verificacionJWT.ts";
import { verifyToken } from "../middleware/verificacionJWT.ts";


const RegistrationRouter = Router();

RegistrationRouter.get("/", verifyToken, verifyRole("participant"), getRegistrations);
RegistrationRouter.get('/:id', verifyToken, verifyRole("participant"), getRegistrationById);
RegistrationRouter.post("/", validateSchema(registrationSchema), verifyToken, verifyRole("participant"), postRegistration);
RegistrationRouter.put('/:id', putRegistration);
RegistrationRouter.delete("/:id", verifyToken, verifyRole("participant"), deleteRegistration);

export default RegistrationRouter;
