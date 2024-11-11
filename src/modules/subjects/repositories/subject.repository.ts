import { PrismaClient, subjects } from '@prisma/client';
const prisma = new PrismaClient();

export class SubjectRepository {
  async createSubject(data: { name: string; code: string; credits: number;}): Promise<subjects> {
    return prisma.subjects.create({ data });
  }

  async findAllSubjects(): Promise<subjects[]> {
    return prisma.subjects.findMany();
  }

  async findSubjectById(id: string): Promise<subjects | null> {
    return prisma.subjects.findUnique({ where: { id } });
  }

  async updateSubject(id: string, data: { name?: string; code?: string; credits?: number; cost?: number }): Promise<subjects> {
    return prisma.subjects.update({ where: { id }, data });
  }

  async deleteSubject(id: string): Promise<subjects> {
    return prisma.subjects.delete({ where: { id } });
  }
}
