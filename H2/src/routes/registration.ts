import { Router } from "express";
import { getRegistrations, getRegistrationById, postRegistration, deleteRegistration, putRegistration } from "../controllers/registration.controller.ts";

const RegistrationRouter = Router();

RegistrationRouter.get('/', getRegistrations);
RegistrationRouter.get('/:id', getRegistrationById);
RegistrationRouter.post('/', postRegistration);
RegistrationRouter.put('/:id', putRegistration);
RegistrationRouter.delete('/:id', deleteRegistration);

export default RegistrationRouter;
