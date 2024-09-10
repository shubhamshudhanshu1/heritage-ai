import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  blocks: [BlockSchema],
});

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  sections: [SectionSchema],
});

const ConfigSchema = new mongoose.Schema({
  tenant: { type: String, required: true },
  userType: { type: String, required: true },
  props: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  pages: [PageSchema],
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
