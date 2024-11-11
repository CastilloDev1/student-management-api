import { PrismaClient, classes } from '@prisma/client';
import { NotFoundError } from '../../../shared/utils/custom-errors/not-found.error';
import { UserTypeEnum } from '../../../shared/enums/user-type.enum';
import { ValidationError } from '../../../shared/utils/custom-errors/validation.error';
const prisma = new PrismaClient();

export class ClassRepository {
  async createClass(data: { name: string; schedule: string; teacher_id: string; subject_id: string }): Promise<classes> {
    
    // Verificar que el teacher_id realmente sea de un docente
    const teacher = await prisma.users.findUnique({
      where: { id: data.teacher_id },
    });

    if (!teacher) {
      throw new NotFoundError('Teacher not found');
    }

    if (teacher.role !== UserTypeEnum.TEACHER) { // Asegúrate de que 'role' existe y define el rol
      throw new ValidationError('Provided ID does not belong to a teacher');
    }

    const subject = await prisma.subjects.findUnique({
      where: { id: data.subject_id }
    });

    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    
    return prisma.classes.create({ data });
  }

  async findAllClasses(): Promise<classes[]> {
    const classes: classes[] = await prisma.classes.findMany();
    if(!classes)
        throw new NotFoundError('No classes found');
    return classes;
  }

  async findClassById(id: string): Promise<classes | null> {
    const user = await prisma.classes.findUnique({
      where: { id },
    });
    if(!user)
      throw new NotFoundError(`Classes not found with id:, ${id}`);
    return user;
  }

  async updateClass(id: string, data: { name?: string; schedule?: string; teacherId?: string; subjectId?: string }): Promise<classes> {
    return prisma.classes.update({ where: { id }, data });
  }

  async deleteClass(id: string): Promise<classes> {
    return prisma.classes.delete({ where: { id } });
  }

  async findClassesWithDetails(): Promise<classes[]> {
    return prisma.classes.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
        students: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        subject: true,
      },
    });
  };

  async getClassWithEnrollments(classId: string): Promise<any> {
    return prisma.classes.findUnique({
      where: { id: classId },
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
        students: {
          include: {
            student: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
