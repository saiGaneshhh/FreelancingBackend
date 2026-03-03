import mongoose from "mongoose";

const sitiMasterSchema = new mongoose.Schema(
  {
    vcNumber: {
      type: String,
      required: true,
      unique: true,
      index: true, // PRIMARY KEY
    },
    date: Date,
    customerName: String,
    mobileNumber: String,
    address: String,
    comments: String,
    oldNumber: String,
    company: String,
  },
  { timestamps: true }
);

export default mongoose.model("SitiMaster", sitiMasterSchema);
