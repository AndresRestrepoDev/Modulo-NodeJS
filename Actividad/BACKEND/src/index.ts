import express from 'express';
import 'dotenv/config';
import { connectDB } from './config/database.ts';

import authRoutes from './routes/auth.routes.ts';
import productRoutes from './routes/product.routes.ts';
import movementRoutes from './routes/movement.routes.ts';
import warehouseRoutes from './routes/warehouse.routes.ts';


const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());

//rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/movements', movementRoutes);
app.use('/api/warehouses', warehouseRoutes);

await connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

