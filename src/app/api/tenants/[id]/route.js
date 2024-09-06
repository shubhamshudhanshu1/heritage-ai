import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Tenant from "@/models/Tenant";

export async function GET({ params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: "Tenant not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: tenant });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = params;
  const body = await request.json();

  try {
    const tenant = await Tenant.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: "Tenant not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: tenant });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE({ params }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const tenant = await Tenant.findByIdAndDelete(id);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: "Tenant not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
