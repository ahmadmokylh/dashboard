import mongoose, { Schema } from 'mongoose';

const sessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
  userAgent: { type: String }, // device info
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // مثلا بعد 30 يوم
});

export const Session =
  mongoose.models.Session || mongoose.model('Session', sessionSchema);
