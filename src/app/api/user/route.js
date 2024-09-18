import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/db";
import User from "@/models/User";
import Role from "@/models/Role";

export async function GET(request) {
  await connectToDatabase();
  try {
    const users = await User.find({}).populate("role");
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const { role } = await request.json(); // Get the new role from the request body

  await connectToDatabase();

  try {
    const roleObj = await Role.findOne({ roleName: role });
    if (!roleObj) {
      return NextResponse.json(
        { success: false, error: "Role not found" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: roleObj._id },
      { new: true }
    ).populate("role");

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
