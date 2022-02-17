import express from "express";
const router = express.Router();
import {
  authStudent,
  getStudentProfile,
  registerStudent,
  forgotPassword,
  resetPassword,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerStudent);
router.patch("/reset-password/:token", resetPassword);
router.post("/login", authStudent);
router.route("/profile").get(protect, getStudentProfile);
router.route("/forgot-password").post(forgotPassword);

export default router;
