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
    const tenant = await Tenant.findOne({ tenantName: body.tenantName });

    const userTypes = await Promise.all(
      body.userTypes.map(async (type) => {
        // Check if userType already exists for this tenant
        let userType = await UserType.findOne({
          name: type.name,
          tenantId: tenant ? tenant._id : null, // Ensure the userType is tenant-specific
        });

        if (userType) {
          // Update existing userType if it exists
          userType = await UserType.findByIdAndUpdate(
            userType._id,
            { ...type }, // Update fields if necessary
            { new: true }
          );
        } else {
          // Create a new userType if it doesn't exist
          userType = await UserType.create({
            ...type,
            tenantId: tenant ? tenant._id : null, // Associate with the tenant
          });
        }

        return userType._id;
      })
    );

    const updatedTenant = await Tenant.findOneAndUpdate(
      { tenantName: body.tenantName },
      {
        ...body,
        userTypes, // Associate the userTypes with the tenant
      },
      {
        new: true,
        upsert: true, // Create the tenant if it doesn't exist
        setDefaultsOnInsert: true,
      }
    ).populate("userTypes");

    return NextResponse.json(
      { success: true, data: updatedTenant },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
