import type { Request, Response } from 'express';
import { RegistrationService } from '../services/registration.service.ts';

export class RegistrationController {
  static async register(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const { courseId } = req.body;

      const registration = await RegistrationService.registerCourse(user.id, courseId);
      res.status(201).json(registration);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getMyRegistrations(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const regs = await RegistrationService.getUserRegistrations(user.id);
      res.json(regs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
