import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  text: { type: String, required: true },
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

const BlockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  blocks: [BlockSchema],
});

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  sections: [SectionSchema],
});

const ConfigSchema = new mongoose.Schema({
  tenant: { type: String, required: true },
  userType: { type: String, required: true },
  settings: [SettingSchema],
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  pages: [PageSchema],
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
