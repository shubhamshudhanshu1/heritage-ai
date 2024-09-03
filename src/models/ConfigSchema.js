import mongoose from "mongoose";

// Common Schemas
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

// Reusable Sectional Schema
const SectionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  settings: [SettingSchema],
  props: [PropsSchema],
});

// Specific Schemas
const BlockSchema = new mongoose.Schema({
  ...SectionalSchema.obj, // Reuse SectionalSchema fields
  blocks: [
    new mongoose.Schema({
      ...SectionalSchema.obj, // Reuse SectionalSchema fields
    }),
  ],
});

const SectionSchema = new SectionalSchema({
  blocks: [BlockSchema],
});

const PageSchema = new SectionalSchema({
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
