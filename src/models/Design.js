import mongoose from "mongoose";

const { Schema } = mongoose;

const DesignSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    designType: {
      type: String,
      enum: ["T-shirt", "Gift Box", "Tin"],
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["draft", "completed"], default: "draft" },
    tags: [{ type: String }],
    previewImages: [{ type: String }],
    lastAccessedAt: { type: Date, default: Date.now },

    // Flexible fields for design specifications
    specifications: { type: Schema.Types.Mixed }, // Holds JSON-like design data

    // General packaging requirements or other metadata
    metadata: { type: Schema.Types.Mixed }, // Additional data or configuration
  },
  { timestamps: true }
);

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);

export default Design;
