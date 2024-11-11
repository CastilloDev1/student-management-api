import { Request, Response } from 'express';
import { ClassEnrollmentUseCase } from '../use-cases/class-enrollments.use-case';

const classEnrollmentUseCase = new ClassEnrollmentUseCase();

export class ClassEnrollmentController {
  async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const newEnrollment = await classEnrollmentUseCase.createEnrollment(req.body);
      res.status(201).json(newEnrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const enrollments = await classEnrollmentUseCase.getAllEnrollments();
      res.status(200).json(enrollments);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener las inscripciones', error });
    }
  }

  async getEnrollmentById(req: Request, res: Response): Promise<any> {
    try {
      const enrollment = await classEnrollmentUseCase.getEnrollmentById(req.params.id);
      if (!enrollment) {
        return res.status(404).json({ message: 'Inscripción no encontrada' });
      }
      res.status(200).json(enrollment);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener la inscripción', error });
    }
  }

  async deleteEnrollment(req: Request, res: Response): Promise<any> {
    try {
      const deletedEnrollment = await classEnrollmentUseCase.deleteEnrollment(req.params.id);
      if (!deletedEnrollment) {
        return res.status(404).json({ message: 'Inscripción no encontrada' });
      }
      res.status(200).json({ message: 'Inscripción eliminada' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar la inscripción', error });
    }
  }

  async getStudentEnrollmentsWithCosts(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.studentId;
      const enrollments = await classEnrollmentUseCase.getStudentEnrollmentsWithCosts(studentId);
      res.status(200).json(enrollments);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener las inscripciones del estudiante', error });
    }
  }
}
