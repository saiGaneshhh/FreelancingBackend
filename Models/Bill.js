import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    vcNumber: {
      type: String,
      required: true,
      index: true,
    },
    date: Date,
    paymentAmount: Number,
    paymentMethod: String,
    invoiceNo: String,
    customerName: String,
    comments: String,
    name: String,
    datetime: String,
    connection: String,
    name2: String,
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
