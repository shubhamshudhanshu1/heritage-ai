import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/db";
import User from "@/models/User";
import Role from "@/models/Role"; // Assuming you have a Role model

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const materialsString = searchParams.get("materials");

  // Split the comma-separated string into an array
  const materials = materialsString ? materialsString.split(",") : [];

  try {
    await connectToDatabase();

    // Find the ObjectId of the "Vendor" role
    console.log({ materials });
    const vendorRole = await Role.findOne({ roleName: "vendor" });
    if (!vendorRole) {
      return NextResponse.json(
        { message: "Vendor role not found" },
        { status: 404 }
      );
    }

    // Query vendors based on materials and role
    const vendors = await User.find({
      role: vendorRole._id,
      materialsAvailable: {
        $in: materials.map((mat) => new RegExp(`^${mat}$`, "i")),
      },
    });

    return NextResponse.json({ data: vendors });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
