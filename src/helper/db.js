import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database.');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
};
