const { default: mongoose } = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Module || mongoose.model("Module", ModuleSchema);
