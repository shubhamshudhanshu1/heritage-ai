import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const {
      userId,
      designType,
      title,
      description,
      tags,
      previewImages,
      chatHistory,
      currentStepIndex,
      specifications,
    } = await req.json();

    // Validate required fields
    const errors = {};
    if (!userId) errors.userId = "User ID is required.";
    if (!designType) errors.designType = "Design type is required.";

    // If there are validation errors, return them in the response
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: "Validation error", errors },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new design
    const newDesign = await Design.create({
      userId,
      designType,
      title,
      description,
      tags,
      previewImages,
      chatHistory,
      currentStepIndex,
      specifications,
      lastAccessedAt: new Date(),
    });

    // Return success response
    return NextResponse.json(
      { message: "Design created successfully", data: newDesign },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
