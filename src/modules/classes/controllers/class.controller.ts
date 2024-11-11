import { NextFunction, Request, Response } from 'express';
import { ClassUseCase } from '../use-cases/class.use-case';

const classUseCase = new ClassUseCase();

export class ClassController {
  
  async createClass(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newClass = await classUseCase.createClass(req.body);
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  }

  async getAllClasses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classes = await classUseCase.getAllClasses();
      res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }

  async getClassById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const classData = await classUseCase.getClassById(req.params.id);
      res.status(200).json(classData);
    } catch (error) {
      next(error);
    }
  }

  async updateClass(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const updatedClass = await classUseCase.updateClass(req.params.id, req.body);
      res.status(200).json(updatedClass);
    } catch (error) {
      next(error);
    }
  }

  async deleteClass(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const deletedClass = await classUseCase.deleteClass(req.params.id);
      res.status(200).json({ message: 'Clase eliminada' });
    } catch (error) {
      next(error);
    }
  }

  async getClassesWithDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classes = await classUseCase.getClassesWithDetails();
      res.status(200).json(classes);
    } catch (error) {
      next(error);
    }
  }

  async getClassWithEnrollments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const classId = req.params.classId;
      const classDetails = await classUseCase.getClassWithEnrollments(classId);
      res.status(200).json(classDetails);
    } catch (error) {
      next(error);
    }
  }
}
