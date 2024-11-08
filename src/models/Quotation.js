const { default: mongoose } = require("mongoose");

const quotationSchema = new mongoose.Schema({
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Design",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  unitPrice: { type: Number },
  shippingCost: { type: Number },
  deliveryTime: { type: Number },
  gst: { type: Number },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["new", "counter", "approved", "rejected"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Quotation =
  mongoose.models.Quotation || mongoose.model("Quotation", quotationSchema);
