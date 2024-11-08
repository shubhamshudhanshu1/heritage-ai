import mongoose from "mongoose";

const LOVSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // The type/category of LOV (e.g., "printing_item", "material")
    name: { type: String, required: true }, // The name of the value (e.g., "T-Shirt", "Cotton")
    value: { type: String }, // Optional, if the LOV needs an additional identifier
  },
  {
    timestamps: true,
  }
);

const LOV = mongoose.models.LOV || mongoose.model("LOV", LOVSchema);

export default LOV;
