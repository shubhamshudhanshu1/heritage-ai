import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    companyName: { type: String },
    itemsPrinted: [{ type: String }],
    materialsAvailable: [{ type: String }],
    pricingRange: { type: String }, // E.g., "₹5-15/Unit"
    minimumOrderQuantity: { type: Number }, // Minimum order units
    deliveryTime: { type: String }, // Delivery duration, e.g., "10 days"
    description: { type: String }, // Vendor description
    location: { type: String }, // Location of the vendor
    yearsOfExperience: { type: Number }, // Years in business
    numberOfJobs: { type: Number }, // Number of jobs completed
    rating: { type: Number }, // Rating, e.g., 4.5/5
    serviceablePincodes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
