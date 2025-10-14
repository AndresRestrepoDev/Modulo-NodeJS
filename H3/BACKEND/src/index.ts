import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.ts';
import { connectMongo } from './config/mongo.ts';
import authRoutes from './routes/auth.route.ts'
import courseRoutes from './routes/course.route.ts';
import registrationRoutes from './routes/registration.routes.ts';
import { startCourseCron } from './jobs/course.cron.ts';


const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/registrations', registrationRoutes);

await connectDB();
await connectMongo();

// Iniciar cron job diario
startCourseCron();


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

