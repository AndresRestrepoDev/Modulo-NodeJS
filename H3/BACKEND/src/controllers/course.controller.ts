import type { Request, Response } from 'express';
import { CourseService } from '../services/course.service.ts';

export class CourseController {
  static async getAll(req: Request, res: Response) {
    try {
      const courses = await CourseService.getAll();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const course = await CourseService.getById(Number(req.params.id));
      if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, description, start_date, status } = req.body;
      const course = await CourseService.create({ title, description, start_date, status });
      res.status(201).json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const course = await CourseService.update(id, req.body);
      res.json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      await CourseService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
