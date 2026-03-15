
import XLSX from "xlsx";
import SitiMaster from "../Models/SitiMaster.js";

/* =====================================================
   GET ALL SITI MASTER
===================================================== */
export const getAllSitiMaster = async (req, res) => {
  try {
    const data = await SitiMaster.find();
    res.json({ total: data.length, data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};


/* =====================================================
   GET SITI MASTER BY ID
===================================================== */
export const getSitiMasterById = async (req, res) => {
  try {
    const data = await SitiMaster.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};


/* =====================================================
   UPDATE SITI MASTER BY ID
===================================================== */
export const updateSitiMasterById = async (req, res) => {
  try {
    const updated = await SitiMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
};


/* =====================================================
   DELETE SITI MASTER BY ID
===================================================== */
export const deleteSitiMasterById = async (req, res) => {
  try {
    const deleted = await SitiMaster.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
};


/* =====================================================
   DELETE ALL SITI MASTER
===================================================== */
export const deleteAllSitiMaster = async (req, res) => {
  try {
    await SitiMaster.deleteMany({});
    res.json({ message: "All records deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all data" });
  }
};

export const addMasterData = async (req, res) => {
  try {
    const newUser = new SitiMaster(req.body);

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User added successfully",
      data: savedUser
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error adding master data"
    });
  }
};
