import { connectToDatabase } from "@/helper/db";
import LOV from "@/models/lov";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const lovs = await LOV.find();
    return NextResponse.json(lovs, { status: 200 });
  } catch (error) {
    console.error("Error fetching LOVs:", error);
    return NextResponse.json(
      { message: "Failed to fetch LOVs" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectToDatabase();

  const body = await request.json();
  const { type, name, value } = body;

  if (!type || !name) {
    return NextResponse.json(
      { message: "Type and name are required" },
      { status: 400 }
    );
  }

  try {
    const newLOV = new LOV({ type, name, value });
    await newLOV.save();
    return NextResponse.json(
      { message: "LOV created successfully", data: newLOV },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating LOV:", error);
    return NextResponse.json(
      { message: "Failed to create LOV" },
      { status: 500 }
    );
  }
}
