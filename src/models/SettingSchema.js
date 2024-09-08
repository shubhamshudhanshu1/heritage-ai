const mongoose = require("mongoose");
const { SettingSchema } = require("./Config");
const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    route: { type: String, unique: true },
    type: {
      type: String,
      enum: ["section", "page"],
      required: true,
    },
    tenantName: {
      type: String,
      required: true,
    },
    settings: [SettingSchema],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.settingSchema ||
  mongoose.model("settingSchema", settingSchema);
