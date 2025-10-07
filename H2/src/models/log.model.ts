import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  action: string;
  userId: number;
  resource: string;
  date: Date;
}

const LogSchema = new Schema<ILog>({
  action: { type: String, required: true },
  userId: { type: Number, required: true },
  resource: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const LogModel = mongoose.model<ILog>("Log", LogSchema);
