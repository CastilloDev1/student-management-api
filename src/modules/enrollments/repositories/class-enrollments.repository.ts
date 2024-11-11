import { PrismaClient, class_enrollments } from '@prisma/client';
import axios from 'axios';
const prisma = new PrismaClient();

interface StudentEnrollmentDetail {
  enrollmentId: string;
  className: string;
  subjectName: string;
  subjectCredits: number;
  costInUSD: number;
  teacherName: string;
  classSchedule: string;
}


export class ClassEnrollmentRepository {
  async createEnrollment(data: { class_id: string; student_id: string }): Promise<class_enrollments> {
    return prisma.class_enrollments.create({ data });
  }

  async findAllEnrollments(): Promise<class_enrollments[]> {
    return prisma.class_enrollments.findMany({
      include: {
        class: true,
        student: true,
      },
    });
  }

  async findEnrollmentById(id: string): Promise<class_enrollments | null> {
    return prisma.class_enrollments.findUnique({
      where: { id },
      include: {
        class: true,
        student: true,
      },
    });
  }

  async deleteEnrollment(id: string): Promise<class_enrollments> {
    return prisma.class_enrollments.delete({ where: { id } });
  }

  async findEnrollmentsByStudentId(student_id: string): Promise<class_enrollments[]> {
    return prisma.class_enrollments.findMany({
      where: { student_id },
      include: {
        class: true,
      },
    });
  }

  async getStudentEnrollmentsWithCosts(studentId: string): Promise<object> {
    const enrollmentsRaw = await prisma.$queryRaw<any[]>`
      CALL GetStudentEnrollmentsWithCosts(${studentId});
    `;
    try {
      // Mapea el resultado para usar los nombres de columnas correctos
      const enrollments = enrollmentsRaw.map((enrollment: any) => ({
        enrollmentId: enrollment.f0,
        className: enrollment.f1,
        subjectName: enrollment.f2,
        subjectCredits: enrollment.f3,
        costInUSD: parseInt(enrollment.f4),
        teacherName: enrollment.f5,
        classSchedule: enrollment.f6,
      }));
  
      // Calcular el costo total en USD
      const totalCostUSD = enrollments.reduce((sum: number, enrollment: any) => sum + enrollment.costInUSD, 0);
  
      // Obtener la tasa de conversión de USD a EUR
      const conversionRate = await this.getConversionRateUSDToEUR();
      
      const totalCostEUR = totalCostUSD * conversionRate;
  
      return {
        enrollments: enrollments[0],
        totalCostUSD,
        totalCostEUR,
      };
      
    } catch (error) {
      throw error;
    }
  }

  async getConversionRateUSDToEUR(): Promise<number> {
    try {
      const response = await axios.get('https://api.frankfurter.app/latest?from=USD&to=EUR');
      return response.data.rates.EUR;
    } catch (error) {
      console.error('Error al obtener la tasa de conversión:', error);
      throw new Error('No se pudo obtener la tasa de conversión de USD a EUR');
    }
  }

  async findClassById(classId: string) {
    return prisma.classes.findUnique({
      where: { id: classId },
      select: {
        id: true,
        teacher_id: true,
      },
    });
  }



}
