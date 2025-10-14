import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.ts';
import authRoutes from './routes/auth.route.ts';
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
await connectDB();
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map