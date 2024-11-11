import { Router } from 'express';
import { ClassController } from '../modules/classes/controllers/class.controller';

const router = Router();
const classController = new ClassController();

router.post('/classes', classController.createClass);
router.get('/classes', classController.getAllClasses);
router.get('/classes/details', classController.getClassesWithDetails);
router.get('/classes/:id', classController.getClassById);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);
router.get('/classes/:classId/enrollments', classController.getClassWithEnrollments);


export default router;