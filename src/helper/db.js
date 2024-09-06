import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
