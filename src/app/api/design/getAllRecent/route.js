import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();
    const recentDesigns = await Design.find()
      .sort({ lastAccessedAt: -1 })
      .limit(5);
    return NextResponse.json({ data: recentDesigns }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
