const { default: mongoose } = require("mongoose");

// 4. Order Model
const orderSchema = new mongoose.Schema({
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  shippingCost: { type: Number },
  deliveryTime: { type: Number },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["quotation_requested", "in_production", "shipped", "delivered"],
    default: "quotation_requested",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
