import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auditoria";

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[MongoDB] ✅ Conectado correctamente");
  } catch (error) {
    console.error("[MongoDB] ❌ Error al conectar:", error);
    process.exit(1);
  }
};
