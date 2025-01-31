import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    await connectToDatabase();
    const designs = await Design.find({ userId }).sort({ lastAccessedAt: -1 });
    return NextResponse.json({ data: designs }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
