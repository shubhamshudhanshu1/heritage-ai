import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const designId = searchParams.get("designId");

  try {
    await connectToDatabase();
    await Design.findByIdAndDelete(designId);
    return NextResponse.json(
      { message: "Design deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
