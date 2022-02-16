import express from "express";
const router = express.Router();
import {
  authStudent,
  getStudentProfile,
  registerStudent,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerStudent);
router.post("/login", authStudent);
router.route("/profile").get(protect, getStudentProfile);

export default router;
