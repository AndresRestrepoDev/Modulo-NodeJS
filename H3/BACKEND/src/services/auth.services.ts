import bcrypt from 'bcrypt';
import { models } from '../config/db.ts';
import { generateToken } from '../utils/jwt.ts';

const User = models.user;

export class AuthService {
  static async register(name: string, email: string, password: string, role: string) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error('El correo ya está registrado.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    return { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta.');

    const token = generateToken({ id: user.id, role: user.role });

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }
}
