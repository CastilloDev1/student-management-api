import { Request, Response } from 'express';
import { SubjectUseCase } from '../use-cases/subject.use-cases';

const subjectUseCase = new SubjectUseCase();

export class SubjectController {
  async createSubject(req: Request, res: Response): Promise<void> {
    try {
      const newSubject = await subjectUseCase.createSubject(req.body);
      res.status(201).json(newSubject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllSubjects(req: Request, res: Response): Promise<void> {
    try {
      const subjects = await subjectUseCase.getAllSubjects();
      res.status(200).json(subjects);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener materias', error });
    }
  }

  async getSubjectById(req: Request, res: Response): Promise<any> {
    try {
      const subject = await subjectUseCase.getSubjectById(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: 'Materia no encontrada' });
      }
      res.status(200).json(subject);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener materia', error });
    }
  }

  async updateSubject(req: Request, res: Response): Promise<any> {
    try {
      const updatedSubject = await subjectUseCase.updateSubject(req.params.id, req.body);
      if (!updatedSubject) {
        return res.status(404).json({ message: 'Materia no encontrada' });
      }
      res.status(200).json(updatedSubject);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSubject(req: Request, res: Response): Promise<any> {
    try {
      const deletedSubject = await subjectUseCase.deleteSubject(req.params.id);
      if (!deletedSubject) {
        return res.status(404).json({ message: 'Materia no encontrada' });
      }
      res.status(200).json({ message: 'Materia eliminada' });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar materia', error });
    }
  }
}
