import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  type: string; // Ej: 'registration.created'
  userId: number;
  courseId?: number;
  timestamp: Date;
  details?: any;
}

const LogSchema = new Schema<ILog>({
  type: { type: String, required: true },
  userId: { type: Number, required: true },
  courseId: { type: Number },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object },
});

export const LogModel = mongoose.model<ILog>('Log', LogSchema);
