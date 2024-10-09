import mongoose from "mongoose";

const UserTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
});

// Ensure that the combination of tenantId and name is unique
UserTypeSchema.index({ tenantId: 1, name: 1 }, { unique: true });

const UserType =
  mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema);
export default UserType;
