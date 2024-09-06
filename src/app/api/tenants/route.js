import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/db";
import Tenant from "@/models/Tenant";
import UserType from "@/models/UserType";

export async function GET() {
  await connectToDatabase();

  try {
    const tenants = await Tenant.find({});
    return NextResponse.json({ success: true, data: tenants });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();

  try {
    const userTypes = await Promise.all(
      body.userTypes.map(async (type) => {
        let userType = await UserType.findOne({ name: type.name });
        if (!userType) {
          userType = await UserType.create(type);
        }
        return userType._id;
      })
    );

    const tenant = await Tenant.create({
      ...body,
      userTypes,
    });

    return NextResponse.json({ success: true, data: tenant }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
