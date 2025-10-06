import { Registration } from "../models/registrations.ts";
import type { RegistrationCreationAttibutes } from "../models/registrations.ts";

type OpcionalRegistration = Partial<Omit<RegistrationCreationAttibutes, 'id' | 'createdAt' | 'updatedAt' | 'user_id' | 'event_id'>>;

export const getRegistrationsService = async () => {
    return await Registration.findAll();
}

export const getRegistrationByIdService = async (id: number) => {
    return await Registration.findByPk(id);
}

export const postRegistrationService = async (body: RegistrationCreationAttibutes) => {
    return await Registration.create(body);
}

export const deleteRegistrationService = async (id:number) => {
    const registration = await Registration.findByPk(id);
    if (!registration) return { success: false, message: 'User not found' };
    await registration.destroy();
    return { success: true, message: 'User deleted' };
}

export const putRegistrationService = async (id: number, body: OpcionalRegistration) => {
  const registration = await Registration.findByPk(id);
  if (!registration) return null;
  
  await registration.update(body);
  return registration;
};