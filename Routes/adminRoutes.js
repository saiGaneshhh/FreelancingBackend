import express from "express";
import multer from "multer";
import path from "path";

import {
  forgotPasswordController,
  loginController,
  resetPasswordController,
  signupController
} from "../Controllers/adminController.js";

import { uploadExcelController } from "../Controllers/excelController.js";
import { getAllCustomers, getCustomerByVC } from "../Controllers/customerController.js";
// import { uploadMasterDataController } from "../Controllers/masterDataController.js";
import {
  uploadMasterDataController,
  getAllMasterData,
  getMasterDataById,
  createMasterData,
  updateMasterDataById,
  updateAllMasterData,
  deleteMasterDataById,
  deleteAllMasterData,
  addMasterData
} from "../Controllers/masterDataController.js";
import { deleteAllSitiMaster, deleteSitiMasterById, getAllSitiMaster, getSitiMasterById, updateSitiMasterById } from "../Controllers/billController.js";
import { uploadSitiMasterController } from "../Controllers/uploadSitiMasterController.js";
// import {
//   uploadSitiMasterController,
//   getAllSitiMaster,
//   getSitiMasterById,
//   updateSitiMasterById,
//   deleteSitiMasterById,
//   deleteAllSitiMaster
// } from "../Controllers/uploadSitiMasterController.js";import { uploadSitiMasterController } from "../Controllers/uploadSitiMasterController.js";
const router = express.Router();

// ========== MULTER CONFIG ==========
// ========== MULTER CONFIG (ALLOW ALL FILES) ==========
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
});


// ========== AUTH ROUTES ==========
router.post("/logins", loginController);
router.post("/signUp", signupController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// ========== EXCEL UPLOAD ==========
router.post("/upload-excel", upload.single("file"), uploadExcelController);
router.get("/all-data", getAllCustomers);
router.post("/upload-master-data", upload.single("file"), uploadMasterDataController);
router.get("/master-data", getAllMasterData);
router.get("/master-data/:id", getMasterDataById);
router.post("/master-data", createMasterData);
router.put("/master-data/:id", updateMasterDataById);
router.put("/master-data", updateAllMasterData);
router.delete("/master-data/:id", deleteMasterDataById);
router.delete("/master-data", deleteAllMasterData);
router.post("/add-master-data", addMasterData);
// ========== GET CUSTOMER ==========
router.get("/customer/:vcNumber", getCustomerByVC);
// Upload
router.post("/upload-siti-master", upload.single("file"), uploadSitiMasterController);

// CRUD
router.get("/siti-master", getAllSitiMaster);
router.get("/siti-master/:id", getSitiMasterById);
router.put("/siti-master/:id", updateSitiMasterById);
router.delete("/siti-master/:id", deleteSitiMasterById);
router.delete("/siti-master", deleteAllSitiMaster);
export default router;
