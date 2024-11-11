import { classes } from '@prisma/client';
import { ClassRepository } from '../repositories/class.repository';

export class ClassUseCase {
  private classRepository: ClassRepository;

  constructor() {
    this.classRepository = new ClassRepository();
  }

  createClass(data: { name: string; schedule: string; teacher_id: string; subject_id: string }): Promise<classes> {
    return this.classRepository.createClass(data);
  }

  getAllClasses(): Promise<classes[]> {
    return this.classRepository.findAllClasses();
  }

  getClassById(id: string): Promise<classes | null> {
    return this.classRepository.findClassById(id);
  }

  updateClass(id: string, data: { name?: string; schedule?: string; teacher_id?: string; subject_id?: string }): Promise<classes> {
    return this.classRepository.updateClass(id, data);
  }

  deleteClass(id: string): Promise<classes> {
    return this.classRepository.deleteClass(id);
  }

  getClassesWithDetails(): Promise<classes[]> {
    return this.classRepository.findClassesWithDetails();
  }

  getClassWithEnrollments(classId: string): Promise<any> {
    return this.classRepository.getClassWithEnrollments(classId);
  }

}
