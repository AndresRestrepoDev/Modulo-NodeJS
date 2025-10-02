import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import sequelize from './database/db.ts';
import userRouter from './routes/users.ts' 

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: [ "GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use('/users', userRouter)

const port = process.env.PORT || 3001;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log(" Conexión exitosa a la base de datos.");

        app.listen(port, () => {
            console.log(` Servidor corriendo en http://localhost:${port}`);
        });

    } catch (error) {
        console.error(" Error al conectarse a la base de datos:", error);
    }
}

startServer();