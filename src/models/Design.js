const { default: mongoose } = require("mongoose");

const designSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["draft", "completed"], default: "draft" },
  tags: [{ type: String }],
  previewImages: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Design =
  mongoose.models.Design || mongoose.model("Design", designSchema);
