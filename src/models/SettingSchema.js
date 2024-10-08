import mongoose from "mongoose";
const { Schema } = mongoose;

const OptionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const SettingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  default: { type: mongoose.Schema.Types.Mixed, required: true },
  info: { type: String, default: "" },
  category: { type: String, default: "" },
  options: [OptionSchema],
});

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
      required: false,
    },
    settings: [SettingSchema],
    sections: [{ type: Schema.Types.ObjectId, ref: "SettingSchema" }],
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
