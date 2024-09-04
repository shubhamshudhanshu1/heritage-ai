// models/Config.js
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

const PropsSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

const BlockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: [PropsSchema],
});

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: [PropsSchema],
  blocks: [BlockSchema],
});

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: [PropsSchema],
  sections: [SectionSchema],
});

const ConfigSchema = new mongoose.Schema({
  tenant: { type: String, required: true },
  userType: { type: String, required: true },
  scope: { type: String, required: true },
  settings: [SettingSchema],
  props: [PropsSchema],
  pages: [PageSchema],
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
