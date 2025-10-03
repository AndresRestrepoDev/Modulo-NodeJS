import { initDB } from './config/database.ts';
import { ENV } from './config/env.ts';
import express from 'express';
import cors from 'cors';

import { router, router as routerBooks } from './routes/book.ts';


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

app.use('/book', router)

const startProgram = async () => {
    try{
        await initDB();
        app.listen(ENV.PORT, () => {
        console.log(`[Server] server running in http://localhost:${ENV.PORT}`)
        })
    } catch (error) {
        console.error('[Server] Startup aborted due to database error')
        process.exit(1);
    }
}

startProgram()

