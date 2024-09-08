import { connectToDatabase } from "@/helper/db";
import SettingSchema from "@/models/SettingSchema";

// GET handler
export async function GET(request) {
  try {
    const url = new URL(request.url); // Use request.nextUrl instead in Next.js App Router
    const params = {
      tenantName: url.searchParams.get("tenantName"),
      slug: url.searchParams.get("slug"),
      type: url.searchParams.get("type"),
    };

    await connectToDatabase(); // Connect to database
    const data = await SettingSchema.find(params);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST handler
export async function POST(request) {
  try {
    const { name, slug, route, type, tenant, settings } = await request.json();

    await connectToDatabase(); // Connect to database
    const newSetting = new SettingSchema({
      name,
      slug,
      route,
      type,
      tenant,
      settings,
    });
    const savedSetting = await newSetting.save();

    return new Response(JSON.stringify(savedSetting), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT handler
export async function PUT(request) {
  try {
    const url = new URL(request.url); // Use request.nextUrl instead in Next.js App Router
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updates = await request.json();

    await connectToDatabase(); // Connect to database
    const updatedSetting = await SettingSchema.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedSetting) {
      return new Response(JSON.stringify({ message: "Setting not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedSetting), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE handler
export async function DELETE(request) {
  try {
    const url = new URL(request.url); // Use request.nextUrl instead in Next.js App Router
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase(); // Connect to database
    const deletedSetting = await SettingSchema.findByIdAndDelete(id);

    if (!deletedSetting) {
      return new Response(JSON.stringify({ message: "Setting not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Setting deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
