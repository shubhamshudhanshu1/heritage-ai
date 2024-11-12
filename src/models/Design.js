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
    title: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: String, enum: ["draft", "completed"], default: "draft" },
    tags: [{ type: String }],
    previewImages: [{ type: String }],
    lastAccessedAt: { type: Date, default: Date.now },

    // Flexible fields for design specifications
    specifications: { type: Schema.Types.Mixed }, // Holds JSON-like design data

    // New fields for chat history and current step index
    chatHistory: [
      {
        isAI: { type: Boolean, required: true },
        message: { type: Schema.Types.Mixed, required: true },
      },
    ],
    currentStepIndex: { type: Number, default: 0 }, // Tracks the current step in the design process

    // General packaging requirements or other metadata
    metadata: { type: Schema.Types.Mixed }, // Additional data or configuration
  },
  { timestamps: true }
);

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);

export default Design;
