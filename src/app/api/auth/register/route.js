import { hash } from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/helper/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    email,
    password,
    lastName,
    firstName,
    mobileNumber,
    role,
    companyName,
    itemsPrinted,
    materialsAvailable,
    pricing,
    serviceablePincodes,
  } = await request.json();

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      lastName,
      firstName,
      mobileNumber,
      role,
      companyName,
      itemsPrinted,
      materialsAvailable,
      pricing,
      serviceablePincodes,
    });

    return NextResponse.json(
      { data: newUser, message: "User created" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err, message: "Server error" },
      { status: 500 }
    );
  }
}
