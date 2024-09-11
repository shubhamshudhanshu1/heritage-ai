import mongoose from "mongoose";

const UserTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
});

const UserType =
  mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema);
export default UserType;
