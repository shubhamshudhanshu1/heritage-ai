import { connectToDatabase } from "@/helper/db";
import { NextResponse } from "next/server";
import { Design } from "@/models/Design";
export async function GET(req) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

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
