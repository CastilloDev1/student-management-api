import { Router } from 'express';
import { ClassEnrollmentController } from '../modules/enrollments/controllers/class-enrollments.controller';

const router = Router();
const classEnrollmentController = new ClassEnrollmentController();

router.post('/enrollments', classEnrollmentController.createEnrollment);
router.get('/enrollments', classEnrollmentController.getAllEnrollments);
router.get('/enrollments/:id', classEnrollmentController.getEnrollmentById);
router.delete('/enrollments/:id', classEnrollmentController.deleteEnrollment);
router.get('/enrollments/student/:studentId', classEnrollmentController.getStudentEnrollmentsWithCosts);

export default router;