import mongoose from "mongoose";
const { Schema } = mongoose;

const tenantSchema = new Schema(
  {
    tenantName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    adminUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    meta: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },
    userTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserType" }],
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);
module.exports = Tenant;
