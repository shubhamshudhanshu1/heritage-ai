import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Config from "@/models/Config";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export async function GET(request, { params }) {
  await connectToDatabase();
  const { tenant, userType, scope } = params;
  try {
    const config = await Config.findOne({ tenant, userType, scope });
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
  const { tenant, userType, scope } = params;
  const { page, settings, props } = await request.json();

  try {
    let config = await Config.findOne({ tenant, userType, scope });

    if (!config) {
      config = new Config({
        tenant,
        userType,
        scope,
        settings: [],
        props: {},
        pages: [],
      });
    }

    if (page) {
      const pageConfig = config.pages.find((p) => p.name === page);
      if (pageConfig) {
        if (settings) {
          pageConfig.settings = settings; // Overriding settings
        }
        if (props) {
          pageConfig.props = { ...pageConfig.props.toObject(), ...props }; // Merging props
        }
      } else {
        config.pages.push({
          name: page,
          settings: settings || [],
          props: props || {},
          sections: [],
        });
      }
    } else {
      if (settings) {
        config.settings = settings; // Overriding settings
      }
      if (props) {
        config.props = { ...config.props.toObject(), ...props }; // Merging props
      }
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
