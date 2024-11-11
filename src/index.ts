import express from 'express';
import userRoutes from './routes/user.routes';
import subjectRoutes from './routes/subject.routes';
import classRoutes from './routes/class.routes';
import classEnrollmentRoutes from './routes/class-enrollments.routes';
import { ErrorHandler } from './shared/middlewares/error-handler.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', subjectRoutes);
app.use('/api', classRoutes);
app.use('/api', classEnrollmentRoutes);

// Middleware de manejo de errores
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});