import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/db";
import Tenant from "@/models/Tenant";
import UserType from "@/models/UserType";

export async function GET(request) {
  await connectToDatabase();
  const { searchParams } = request.nextUrl;
  const tenantId = searchParams.get("tenantId");
  const tenantName = searchParams.get("tenantName");

  const filter = {};
  if (tenantId) filter._id = tenantId;
  if (tenantName) filter.tenantName = tenantName;
  try {
    const tenants = await Tenant.find(filter).populate("userTypes");
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

  if (!body.tenantName) {
    return NextResponse.json(
      { success: false, error: "Please provide tenant name." },
      { status: 400 }
    );
  }
  try {
    const userTypes = await Promise.all(
      body.userTypes.map(async (type) => {
        let userType = await UserType.findOne({
          name: type.name,
          label: type.label,
        });

        if (!userType) {
          userType = await UserType.create(type);
        }

        return userType._id;
      })
    );

    try {
      const tenant = await Tenant.findOneAndUpdate(
        { tenantName: body.tenantName },
        {
          ...body,
          userTypes,
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      return NextResponse.json(
        { success: true, data: tenant },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
