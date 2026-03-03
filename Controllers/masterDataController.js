import XLSX from "xlsx";
import Bill from "../Models/Bill.js";

/* =====================================================
   1️⃣ UPLOAD MASTER DATA (EXCEL)
===================================================== */
export const uploadMasterDataController = async (req, res) => {
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
        // Helper function to normalize keys
        const normalizeKey = (key) =>
            key.toLowerCase().replace(/\s+/g, "");

        const formattedData = sheetData
            .map((row) => {
                const normalizedRow = {};

                Object.keys(row).forEach((key) => {
                    normalizedRow[key.toLowerCase().replace(/\s+/g, "")] = row[key];
                });

                return {
                    vcNumber: normalizedRow["vcnumber"] ?? null,
                    date: normalizedRow["date"] ?? null,
                    paymentAmount: normalizedRow["paymentamount"] ?? null,
                    paymentMethod: normalizedRow["paymentmethod"] ?? null,
                    invoiceNo: normalizedRow["invoiceno"] ?? null,
                    customerName: normalizedRow["customername"] ?? null,
                    comments: normalizedRow["comments"] ?? null,
                    name: normalizedRow["name"] ?? null,
                    datetime: normalizedRow["datetime"] ?? null,
                    connection: normalizedRow["connection"] ?? null,
                    name2: normalizedRow["name2"] ?? null,
                };
            })
            // 🔥 FILTER OUT ROWS WHERE vcNumber IS NULL OR EMPTY
            .filter(row => row.vcNumber && row.vcNumber !== "");

        if (formattedData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid rows found (vcNumber missing)"
            });
        }

        await Bill.insertMany(formattedData);


        res.status(200).json({
            success: true,
            message: "Master-data uploaded successfully",
            totalInserted: formattedData.length,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};
/* =====================================================
   2️⃣ GET ALL DATA
===================================================== */
export const getAllMasterData = async (req, res) => {
    try {
        const data = await Bill.find();
        res.json({ total: data.length, data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
};
/* =====================================================
   3️⃣ GET DATA BY ID
===================================================== */
export const getMasterDataById = async (req, res) => {
    try {
        const data = await Bill.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Not found" });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
};
/* =====================================================
   4️⃣ CREATE MANUAL DATA
===================================================== */
export const createMasterData = async (req, res) => {
    try {
        const newData = await Bill.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ message: "Error creating data" });
    }
};
/* =====================================================
   5️⃣ UPDATE BY ID
===================================================== */
export const updateMasterDataById = async (req, res) => {
    try {
        const updated = await Bill.findByIdAndUpdate(
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
   6️⃣ UPDATE ALL DATA
===================================================== */
export const updateAllMasterData = async (req, res) => {
    try {
        const result = await Bill.updateMany({}, req.body);

        res.json({
            message: "All records updated",
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating all data" });
    }
};


/* =====================================================
   7️⃣ DELETE BY ID
===================================================== */
export const deleteMasterDataById = async (req, res) => {
    try {
        const deleted = await Bill.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ message: "Not found" });

        res.json({ message: "Record deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting data" });
    }
};


/* =====================================================
   8️⃣ DELETE ALL DATA
===================================================== */
export const deleteAllMasterData = async (req, res) => {
    try {
        await Bill.deleteMany({});
        res.json({ message: "All records deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting all data" });
    }
};
