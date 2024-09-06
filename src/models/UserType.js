import mongoose from "mongoose";

const UserTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const UserType =
  mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema);
export default UserType;
