const { default: mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  allowedModules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],
});

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
