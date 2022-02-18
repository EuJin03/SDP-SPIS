import express from "express";
const router = express.Router();
import {
  authStudent,
  getStudentProfile,
  registerStudent,
  forgotPassword,
  resetPassword,
  updateStudent,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerStudent);
router.post("/login", authStudent);
router
  .route("/profile")
  .get(protect, getStudentProfile)
  .patch(protect, updateStudent);
router.route("/forgot-password").post(forgotPassword);
router.patch("/reset-password/:token", resetPassword);

export default router;
