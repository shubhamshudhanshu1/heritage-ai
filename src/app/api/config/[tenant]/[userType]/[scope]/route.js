// app/api/config/[tenant]/[userType]/[scope]/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Config from "../../../../models/Config"; // Adjust the path as needed

// Connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export async function GET(request, { params }) {
  const { tenant, userType, scope, page } = params;

  await connectToDatabase();

  try {
    let config = await Config.findOne({ tenant, userType, scope });

    if (!config) {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 404 }
      );
    }

    if (scope === "global") {
      // Return global props
      return NextResponse.json({
        props: {
          ...config.props.reduce((acc, prop) => {
            acc[prop.key] = prop.value;
            return acc;
          }, {}),
        },
      });
    } else if (scope === "pages" && page) {
      // Return props for a specific page
      const pageConfig = config.pages.find((p) => p.name === page);
      if (pageConfig) {
        return NextResponse.json({
          props: {
            ...pageConfig.props.reduce((acc, prop) => {
              acc[prop.key] = prop.value;
              return acc;
            }, {}),
          },
        });
      } else {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json(
        { error: "Invalid scope or missing page" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
