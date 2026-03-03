import XLSX from "xlsx";
import SitiMaster from "../Models/SitiMaster.js";

export const uploadSitiMasterController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];

    const sheetData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    if (!sheetData.length) {
      return res.status(400).json({
        success: false,
        message: "Excel file is empty",
      });
    }

    const normalizeKey = (key) =>
      key.toLowerCase().replace(/\s+/g, "");

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (let row of sheetData) {
      const normalizedRow = {};

      Object.keys(row).forEach((key) => {
        normalizedRow[normalizeKey(key)] = row[key];
      });

      const vcNumber = normalizedRow["vcnumber"];

      if (!vcNumber) {
        skipped++;
        continue;
      }

      const existing = await SitiMaster.findOne({ vcNumber });

      if (existing) {
        await SitiMaster.updateOne(
          { vcNumber },
          {
            date: normalizedRow["date"] ?? null,
            customerName: normalizedRow["customername"] ?? null,
            mobileNumber: normalizedRow["mobilenumber"] ?? null,
            address: normalizedRow["address"] ?? null,
            comments: normalizedRow["comments"] ?? null,
            oldNumber: normalizedRow["oldnumber"] ?? null,
            company: normalizedRow["company"] ?? null,
          }
        );
        updated++;
      } else {
        await SitiMaster.create({
          vcNumber,
          date: normalizedRow["date"] ?? null,
          customerName: normalizedRow["customername"] ?? null,
          mobileNumber: normalizedRow["mobilenumber"] ?? null,
          address: normalizedRow["address"] ?? null,
          comments: normalizedRow["comments"] ?? null,
          oldNumber: normalizedRow["oldnumber"] ?? null,
          company: normalizedRow["company"] ?? null,
        });
        inserted++;
      }
    }

    res.status(200).json({
      success: true,
      message: "SitiMaster upload completed",
      inserted,
      updated,
      skipped,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};