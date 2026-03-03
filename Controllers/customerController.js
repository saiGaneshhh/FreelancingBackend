import SitiMaster from "../Models/SitiMaster.js";
import Bill from "../Models/Bill.js";

export const getCustomerByVC = async (req, res) => {
  try {
    const master = await SitiMaster.findOne({
      vcNumber: req.params.vcNumber,
    });

    const bills = await Bill.find({
      vcNumber: req.params.vcNumber,
    });

    res.json({ master, bills });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};
export const getAllCustomers = async (req, res) => {
  try {
    const masters = await SitiMaster.find();
    const bills = await Bill.find();

    res.json({
      totalMasters: masters.length,
      totalBills: bills.length,
      masters,
      bills
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};
