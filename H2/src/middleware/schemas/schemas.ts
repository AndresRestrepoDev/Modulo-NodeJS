import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("El correo no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("El correo no es válido"),
  password: z.string().min(6, "Contraseña inválida"),
});


export const registrationSchema = z.object({
  user_id: z.number().int("El ID de usuario debe ser un número"),
  event_id: z.number().int("El ID de evento debe ser un número"),
});

export const eventSchema = z.object({
  title: z.string().min(3, "El título es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  event_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha del evento no es válida",
  }),
  locacion: z.string().optional(),
  capacity: z.number().int().positive("La capacidad debe ser un número positivo").optional(),
  organizer_id: z.number().int("El ID del organizador debe ser numérico"),
});



