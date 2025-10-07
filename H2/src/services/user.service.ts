import { User } from "../models/users.ts";
import type { UserCreationAttributes } from "../models/users.ts";
import { Op } from 'sequelize';

type OpcionalUser = Partial<Omit<UserCreationAttributes, 'id' | 'createdAt' | 'updatedAt' | 'role'>>;

export const getUsersService = async () => {
    return await User.findAll();
}

export const getUserByIdService = async (id: number) => {
    return await User.findByPk(id);
}

export const postUserService = async (body: UserCreationAttributes) => {
    return await User.create(body);
}

export const deleteUserService = async (id:number) => {
    const user = await User.findByPk(id);
    if (!user) return { success: false, message: 'User not found' };
    await user.destroy();
    return { success: true, message: 'User deleted' };
}

export const putUserService = async (id: number, body: OpcionalUser) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  
  await user.update(body);
  return user;
};

// consultas avanzadas
export const searchRoleServices = async (rol:string) => {
    try {
        const users = await User.findAll({
            where: {
                role: {
                    [Op.eq]: rol,
                },
            },
        })
        return users;
    } catch (error) {
        console.error('Error buscando usuarios por roles:', error);
        throw error;
    }
}