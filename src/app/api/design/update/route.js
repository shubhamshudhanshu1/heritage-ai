import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const designId = searchParams.get("designId");
  const updateFields = await req.json();

  try {
    await connectToDatabase();
    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      { ...updateFields, lastAccessedAt: new Date() },
      { new: true }
    );
    return NextResponse.json(
      { message: "Design updated successfully", data: updatedDesign },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
