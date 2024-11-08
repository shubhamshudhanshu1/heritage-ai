const { default: mongoose } = require("mongoose");
const bomSchema = new mongoose.Schema({
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design",
    required: true,
  },
  materials: [
    {
      materialName: { type: String, required: true },
      materialDescription: { type: String },
    },
  ],
  manufacturingSteps: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const BOM = mongoose.models.BOM || mongoose.model("BOM", bomSchema);
