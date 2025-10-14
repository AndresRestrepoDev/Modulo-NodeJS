import { models } from '../config/db.ts';
import { LogService } from './log.service.ts';

const Registration = models.registration;
const Course = models.course;

export class RegistrationService {
  static async registerCourse(userId: number, courseId: number) {
    // 1️⃣ Verificar si el curso existe y está activo
    const course = await Course.findByPk(courseId);
    if (!course) throw new Error('El curso no existe.');
    if (!course.status) throw new Error('El curso no está activo.');

    // 2️⃣ Verificar si el usuario ya está inscrito
    const existing = await Registration.findOne({ where: { user_id: userId, course_id: courseId } });
    if (existing) throw new Error('Ya estás inscrito en este curso.');

    // 3️⃣ Crear la inscripción
    const newReg = await Registration.create({ user_id: userId, course_id: courseId });

    // 4️⃣ Guardar log en MongoDB
    await LogService.create('registration.created', userId, courseId, {
      registrationId: newReg.id,
    });

    return newReg;
  }

  static async getUserRegistrations(userId: number) {
    return Registration.findAll({
      where: { user_id: userId },
      include: [{ model: Course, as: 'course' }],
    });
  }
}
