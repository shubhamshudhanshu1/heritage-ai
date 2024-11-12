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
      unitPrice * quantity + shippingCost + (gst / 100) * unitPrice * quantity;

    const quotation = await Quotation.create({
      designId,
      vendorId,
      unitPrice,
      shippingCost,
      deliveryTime,
      gst,
      totalAmount,
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
