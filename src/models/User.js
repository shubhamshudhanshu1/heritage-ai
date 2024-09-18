import mongoose from "mongoose";

const { Schema } = mongoose;

// mySuperSecretPassword;
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    tenants: [{ type: Schema.Types.ObjectId, ref: "Tenant" }],
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
