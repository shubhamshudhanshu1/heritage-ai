import { Quotation } from "@/models/Quotation";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helper/db";

export async function POST(req) {
  const {
    designId,
    vendorId,
    unitPrice,
    shippingCost,
    deliveryTime,
    gst,
    quantity,
    userId,
  } = await req.json();

  if (!designId || !vendorId || !quantity) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const totalAmount =
      unitPrice * quantity +
        shippingCost +
        (gst / 100) * unitPrice * quantity || 0;

    const quotation = await Quotation.create({
      userId,
      designId,
      vendorId,
      unitPrice,
      shippingCost,
      deliveryTime,
      gst,
      totalAmount,
      quantity,
      status: "new",
    });

    return NextResponse.json(
      { message: "Quotation created successfully", quotation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quotation: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const vendorId = searchParams.get("vendorId");
  const designId = searchParams.get("designId");
  const status = searchParams.get("status");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing required userId parameter" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const query = {};
    if (designId) query.designId = designId;
    if (status) query.status = status;
    if (vendorId) query.vendorId = vendorId;
    if (userId) query.userId = userId;

    const quotations = await Quotation.find(query)
      .populate("designId")
      .populate("vendorId");

    return NextResponse.json(
      { message: "Quotations fetched successfully", quotations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quotations: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
