import { subjects } from '@prisma/client';
import { SubjectRepository } from '../repositories/subject.repository';

export class SubjectUseCase {
  private subjectRepository: SubjectRepository;

  constructor() {
    this.subjectRepository = new SubjectRepository();
  }

  async createSubject(data: { name: string; code: string; credits: number;}): Promise<subjects> {
    return this.subjectRepository.createSubject(data);
  }

  async getAllSubjects(): Promise<subjects[]> {
    return this.subjectRepository.findAllSubjects();
  }

  async getSubjectById(id: string): Promise<subjects | null> {
    return this.subjectRepository.findSubjectById(id);
  }

  async updateSubject(id: string, data: { name?: string; code?: string; credits?: number; cost?: number }): Promise<subjects> {
    return this.subjectRepository.updateSubject(id, data);
  }

  async deleteSubject(id: string): Promise<subjects> {
    return this.subjectRepository.deleteSubject(id);
  }
}
