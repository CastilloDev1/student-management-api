import { class_enrollments } from '@prisma/client';
import { ClassEnrollmentRepository } from '../repositories/class-enrollments.repository';
interface StudentEnrollmentDetail {
  enrollmentId: string;
  className: string;
  subjectName: string;
  subjectCredits: number;
  costInUSD: number;
  teacherName: string;
  classSchedule: string;
}
export class ClassEnrollmentUseCase {
  private classEnrollmentRepository: ClassEnrollmentRepository;

  constructor() {
    this.classEnrollmentRepository = new ClassEnrollmentRepository();
  }

  async createEnrollment(data: { class_id: string; student_id: string }): Promise<class_enrollments> {
    
    // Validar que un estudiante no esté inscrito en más de 3 clases
    const currentEnrollments = await this.classEnrollmentRepository.findEnrollmentsByStudentId(data.student_id);
    if (currentEnrollments.length >= 3) {
      throw new Error('El estudiante ya está inscrito en el máximo de 3 clases permitidas.');
    }

    // Verificar si el estudiante ya está inscrito en otra clase con el mismo profesor
    const classDetails = await this.classEnrollmentRepository.findClassById(data.class_id);
    const hasSameTeacher = currentEnrollments.some((enrollment: any) => enrollment?.class.teacherId === classDetails?.teacher_id);

    if (hasSameTeacher) {
      throw new Error('El estudiante ya está inscrito en una clase con el mismo profesor.');
    }

    // Validar que el estudiante no esté inscrito en la misma clase más de una vez
    const existingEnrollment = currentEnrollments.find(enrollment => enrollment.class_id === data.class_id);
    if (existingEnrollment) {
      throw new Error('El estudiante ya está inscrito en esta clase.');
    }

    // Crear la inscripción si las validaciones pasan
    return this.classEnrollmentRepository.createEnrollment(data);
  }

  async getAllEnrollments(): Promise<class_enrollments[]> {
    return this.classEnrollmentRepository.findAllEnrollments();
  }

  async getEnrollmentById(id: string): Promise<class_enrollments | null> {
    return this.classEnrollmentRepository.findEnrollmentById(id);
  }

  async deleteEnrollment(id: string): Promise<class_enrollments> {
    return this.classEnrollmentRepository.deleteEnrollment(id);
  }

  async getStudentEnrollmentsWithCosts(studentId: string): Promise<object> {
    return this.classEnrollmentRepository.getStudentEnrollmentsWithCosts(studentId);
  }
}
