// app/api/config/[tenant]/[userType]/[scope]/route.js
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
        props: [],
        pages: [],
      });
    }

    if (page) {
      const pageConfig = config.pages.find((p) => p.name === page);
      if (pageConfig) {
        if (settings) {
          pageConfig.settings.push(...settings);
        }
        if (props) {
          pageConfig.props.push(...props);
        }
      } else {
        config.pages.push({ name: page, settings, props, sections: [] });
      }
    } else {
      if (settings) {
        config.settings.push(...settings);
      }
      if (props) {
        config.props.push(...props);
      }
    }

    await config.save();
    return NextResponse.json({
      message: "Configuration created/updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { tenant, userType, scope } = params;
  const { page, settings, props } = await request.json();

  try {
    let config = await Config.findOne({ tenant, userType, scope });

    if (!config) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    if (page) {
      const pageConfig = config.pages.find((p) => p.name === page);
      if (pageConfig) {
        if (settings) {
          pageConfig.settings = settings;
        }
        if (props) {
          pageConfig.props = props;
        }
      } else {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
    } else {
      if (settings) {
        config.settings = settings;
      }
      if (props) {
        config.props = props;
      }
    }

    await config.save();
    return NextResponse.json({ message: "Configuration updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  const { tenant, userType, scope } = params;
  const { page } = await request.json();

  try {
    let config = await Config.findOne({ tenant, userType, scope });

    if (!config) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    if (page) {
      config.pages = config.pages.filter((p) => p.name !== page);
    } else {
      await Config.deleteOne({ tenant, userType, scope });
    }

    await config.save();
    return NextResponse.json({ message: "Configuration deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
