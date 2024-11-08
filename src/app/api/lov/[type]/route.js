import { connectToDatabase } from "@/helper/db";
import LOV from "@/models/LOV";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { type } = params;

  try {
    const lovs = await LOV.find({ type });
    return NextResponse.json(lovs, { status: 200 });
  } catch (error) {
    console.error("Error fetching LOVs:", error);
    return NextResponse.json(
      { message: "Failed to fetch LOVs" },
      { status: 500 }
    );
  }
}
