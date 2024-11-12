// Import necessary libraries
import { connectToDatabase } from "@/helper/db";
import Design from "@/models/Design";
import { NextResponse } from "next/server";

// 1. Create Design API
export async function POST(req) {
  const {
    userId,
    title,
    description,
    tags,
    previewImages,
    chatHistory,
    currentStepIndex,
    specifications,
  } = await req.json();

  try {
    await connectToDatabase();
    const newDesign = await Design.create({
      userId,
      title,
      description,
      tags,
      previewImages,
      chatHistory,
      currentStepIndex,
      specifications,
      lastAccessedAt: new Date(),
    });
    return NextResponse.json(
      { message: "Design created successfully", data: newDesign },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// 2. Update Design API
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

// 3. Delete Design API
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

// 4. Get Designs by User ID API
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

// 5. Get Design by ID API
export async function GET_BY_ID(req) {
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
    // Update lastAccessedAt field
    design.lastAccessedAt = new Date();
    await design.save();
    return NextResponse.json({ data: design }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// 6. Get Recent Designs by User ID API
export async function GET_RECENT_BY_USER(req) {
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

// 7. Get All Recent Designs API
export async function GET_ALL_RECENT(req) {
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
