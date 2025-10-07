import { initModels } from "./models/relaciones.ts";
import { sequelize } from "./configSequelize/dbSeq.ts";
import { connectMongo } from "./configMongo/mongo.ts";
import { ENV } from './configSequelize/env.ts';
import UserRouter from "./routes/user.ts";
import EventRouter from "./routes/event.ts";
import RegistrationRouter from "./routes/registration.ts";
import AutRouter from "./routes/authRoutes.ts";

import express from 'express';
import cors from 'cors';

const app = express();

const whitelist = ['http://localhost:5173/'];
const corsOptions = {
  origin: (origin:any, callback:any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', UserRouter);
app.use('/event', EventRouter)
app.use('/registration ', RegistrationRouter);

app.use('/auth', AutRouter);


app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('[DB] connection to the database successfully');
        initModels();

        await sequelize.sync({ alter: true }); 
        console.log('[DB] ✅ Models synchronized');
    } catch (error) {
        console.error('[DB] connection to the database failed', error);
        throw error;
    }
};

const startProgram = async () => {
    try{
        await initDB();
        await connectMongo();
        app.listen(ENV.PORT, () => {
        console.log(`[Server] server running in http://localhost:${ENV.PORT}`)
        })
    } catch (error) {
        console.error('[Server] Startup aborted due to database error')
        process.exit(1);
    }
}

startProgram()