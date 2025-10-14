import { models } from '../config/db.ts';
const Course = models.course;

export class CourseService {
  static async getAll() {
    return Course.findAll();
  }

  static async getById(id: number) {
    return Course.findByPk(id);
  }

  static async create(data: any) {
    return Course.create(data);
  }

  static async update(id: number, data: any) {
    const course = await Course.findByPk(id);
    if (!course) throw new Error('Curso no encontrado');
    await course.update(data);
    return course;
  }

  static async remove(id: number) {
    const course = await Course.findByPk(id);
    if (!course) throw new Error('Curso no encontrado');
    await course.destroy();
  }
}
