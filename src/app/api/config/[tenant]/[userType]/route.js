import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Config from "@/models/Config";
import { connectToDatabase } from "@/helper/db";

export async function GET(request, { params }) {
  await connectToDatabase();
  const { tenant, userType } = params;
  try {
    const config = await Config.findOne({ tenant, userType });
    if (!config) {
      return NextResponse.json({});
    }
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  await connectToDatabase();
  const { tenant, userType } = params;
  const { pages, settings, props } = await request.json();

  try {
    let config = await Config.findOne({ tenant, userType });
    if (!config) {
      config = new Config({
        tenant,
        userType,
        settings,
        props,
        pages,
      });
    } else {
      config.settings = settings;
      config.props = props;
      config.pages = pages;
    }
    let savedConfig = await config.save();
    return NextResponse.json({
      message: "Configuration updated successfully",
      data: savedConfig,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
