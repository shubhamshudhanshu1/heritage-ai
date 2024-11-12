import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const designId = searchParams.get("designId");

  try {
    await connectToDatabase();
    const design = await Design.findById(designId);
    if (!design) {
      return NextResponse.json(
        { message: "Design not found" },
        { status: 404 }
      );
    }
    design.lastAccessedAt = new Date();
    await design.save();
    return NextResponse.json({ data: design }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
