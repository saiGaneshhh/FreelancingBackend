import XLSX from "xlsx";
import SitiMaster from "../Models/SitiMaster.js";
import Bill from "../Models/Bill.js";
import fs from "fs";

export const uploadExcelController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;
    const fileExt = req.file.originalname.split(".").pop().toLowerCase();

    // ===============================
    // IF FILE IS EXCEL → PROCESS DATA
    // ===============================
    if (["xls", "xlsx", "xlsm", "csv"].includes(fileExt)) {

      const workbook = XLSX.readFile(filePath);

      for (let sheetName of workbook.SheetNames) {
        const sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        // SITI MASTER SHEET
        if (sheetName.toLowerCase().includes("siti")) {
          for (let row of sheetData) {
            await SitiMaster.updateOne(
              { vcNumber: row["VC Number"] },
              {
                vcNumber: row["VC Number"],
                date: row["Date"],
                customerName: row["Customer Name"],
                mobileNumber: row["Mobile Number"],
                address: row["Address"],
                comments: row["Comments"],
                oldNumber: row["Old Number"],
                company: row["Company"],
              },
              { upsert: true }
            );
          }
        }

        // BILLS SHEET
        if (sheetName.toLowerCase().includes("bill")) {
          for (let row of sheetData) {
            await Bill.create({
              vcNumber: row["VC Number"],
              date: row["Date"],
              paymentAmount: row["Payment Amount"],
              paymentMethod: row["Payment Method"],
              invoiceNo: row["Invoice No"],
              customerName: row["Customer Name"],
              comments: row["Comments"],
              name: row["Name"],
              datetime: row["DATE/TIME"],
              connection: row["Connection"],
              name2: row["Name2"],
            });
          }
        }
      }

      return res.status(200).json({
        success: true,
        message: "Excel processed and data stored successfully",
      });
    }

    // ==================================
    // IF NOT EXCEL → JUST STORE FILE
    // ==================================
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully (no Excel processing)",
      fileName: req.file.originalname,
      storedAs: req.file.filename,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};
