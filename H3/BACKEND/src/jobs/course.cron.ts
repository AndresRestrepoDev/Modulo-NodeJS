import cron from 'node-cron';
import { Op } from 'sequelize';
import { models } from '../config/db.js';
import { LogService } from '../services/log.service.js';

const Course = models.course;

/**
 * Programa un cron job diario a las 00:00.
 * Desactiva cursos cuyo start_date ya pasó.
 */
export const startCourseCron = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Iniciando tarea de desactivación de cursos vencidos...');

    try {
      const now = new Date();

      // Buscar cursos activos cuya fecha de inicio ya pasó
      const expiredCourses = await Course.findAll({
        where: {
          status: true,
          start_date: { [Op.lt]: now },
        },
      });

      if (expiredCourses.length === 0) {
        console.log('[CRON] No hay cursos vencidos hoy.');
        return;
      }

      // Desactivar cursos
      const ids = expiredCourses.map((c: any) => c.id);
      await Course.update({ status: false }, { where: { id: ids } });

      // Registrar log
      await LogService.create('cron.deactivateCourses', 0, undefined, {
        deactivated: ids,
        count: ids.length,
        executedAt: now,
      });

      console.log(`[CRON] ${ids.length} curso(s) desactivado(s): [${ids.join(', ')}]`);
    } catch (error: any) {
      console.error('[CRON] Error durante la ejecución del cron:', error.message);
      await LogService.create('cron.error', 0, undefined, { message: error.message });
    }
  });
};
