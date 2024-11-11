import { PrismaClient, users  } from '@prisma/client';
import { UserTypeEnum } from '../../../shared/enums/user-type.enum';
import { NotFoundError } from '../../../shared/utils/custom-errors/not-found.error';

const prisma = new PrismaClient();

export class UserRepository {
  
  async findAll(): Promise<users[]> {
    const users: users[] = await prisma.users.findMany();
    if(!users){
      throw new NotFoundError('No users found');
    }
    return users;
  }

  async findById(id: string): Promise<users> {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    if(!user)
      throw new NotFoundError(`User not found with id:, ${id}`);
    return user;
  }

  async createUser(data: { name: string; email: string; role: UserTypeEnum; specialty?: string }) {
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role
      },
    });
    return newUser;
  }

  async update(id: string, data: Partial<users>): Promise<users> {
      return prisma.users.update({
        where: { id },
        data,
      });
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.users.delete({
        where: { id },
      });
    } catch {}
  }
}