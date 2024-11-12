import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const recentDesigns = await Design.find({ userId })
      .sort({ lastAccessedAt: -1 })
      .limit(5);

    return NextResponse.json({ data: recentDesigns }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
