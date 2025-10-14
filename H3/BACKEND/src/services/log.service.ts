import { LogModel } from '../models/log.model.ts';
import chalk from 'chalk';

export class LogService {
  static async create(type: string, userId: number, courseId?: number, details?: any) {
    await LogModel.create({
      type,
      userId,
      courseId,
      details,
    }); 

    const courseInfo = courseId ? chalk.magenta(`Course: ${courseId}`) : '';

    console.log(
        chalk.green(`[LOG OK]`),
        chalk.cyan(type),
        chalk.yellow(`User: ${userId}`),
        courseInfo,
        chalk.gray(new Date().toLocaleTimeString())
      );
  }
}
