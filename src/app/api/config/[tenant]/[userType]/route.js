// app/api/config/[tenant]/[userType]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Config from "@/models/Config";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export async function GET(request, { params }) {
  await connectToDatabase();
  const { tenant, userType } = params;
  try {
    const configs = await Config.find({ tenant, userType });
    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
