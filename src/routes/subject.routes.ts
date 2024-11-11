import { Router } from 'express';
import { SubjectController } from '../modules/subjects/controllers/subject.controller';

const router = Router();
const subjectController = new SubjectController();

router.post('/subjects', subjectController.createSubject);
router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

export default router;