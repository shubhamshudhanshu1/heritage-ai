import { connectToDatabase } from "@/helper/db";
import SettingSchema from "@/models/SettingSchema";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    const url = new URL(request.url);

    let slug = url.searchParams.get("slug");
    let type = url.searchParams.get("type");
    let tenantName = url.searchParams.get("tenantName");
    let params = {};
    if (tenantName) {
      params.tenantName = tenantName;
    }
    if (type) {
      params.type = type;
    }

    if (slug) {
      params.slug = slug;
    }

    await connectToDatabase();
    const data = await SettingSchema.find(params)
      .populate("blocks")
      .populate("sections");

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

export async function POST(request) {
  try {
    const {
      _id,
      name,
      slug,
      route,
      type,
      tenantName,
      settings,
      blocks = [],
    } = await request.json();

    await connectToDatabase();

    const blockIds = blocks.map(
      (block) => new mongoose.Types.ObjectId(block._id)
    );

    let response;

    if (_id) {
      const updatedSetting = await SettingSchema.findByIdAndUpdate(
        _id,
        { name, slug, route, type, tenantName, settings, blocks: blockIds },
        { new: true }
      );

      if (!updatedSetting) {
        return new Response(JSON.stringify({ message: "Setting not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      response = new Response(JSON.stringify(updatedSetting), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const newSetting = new SettingSchema({
        name,
        slug,
        route,
        type,
        tenantName,
        settings,
        blocks: blockIds,
      });

      const savedSetting = await newSetting.save();

      response = new Response(JSON.stringify(savedSetting), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
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
