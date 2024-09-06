const mongoose = require("mongoose");
const { Schema } = mongoose;

const tenantSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tenantName: {
      type: String,
      required: true,
      trim: true,
    },
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
