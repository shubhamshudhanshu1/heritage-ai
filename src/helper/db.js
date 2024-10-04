// helper/db.js
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database.");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};
