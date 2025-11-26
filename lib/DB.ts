import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

const dbURL = process.env.DATABASE_URL_MONGODB!;

export async function connectDB() {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected (readyState)');
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(dbURL);
    isConnected = true;

    console.log('🔥 MongoDB Connected');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    throw err;
  }
}
