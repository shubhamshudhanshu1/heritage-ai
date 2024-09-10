import mongoose from "mongoose";
import { SettingSchema } from "./Config";
const { Schema } = mongoose;

// Assuming SettingSchema is defined somewhere else and is being imported
const settingSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    route: { type: String },
    type: {
      type: String,
      enum: ["section", "page", "global", "block"],
      required: true,
    },
    tenantName: {
      type: String,
      required: true,
    },
    settings: [SettingSchema],
    blocks: [{ type: Schema.Types.ObjectId, ref: "SettingSchema" }],
  },
  { timestamps: true }
);

settingSchema.index(
  { route: 1 },
  { unique: true, partialFilterExpression: { route: { $ne: null } } }
);

settingSchema.index(
  { slug: 1, type: 1 },
  { unique: true, partialFilterExpression: { slug: { $ne: null } } }
);

export default mongoose.models.SettingSchema ||
  mongoose.model("SettingSchema", settingSchema);
