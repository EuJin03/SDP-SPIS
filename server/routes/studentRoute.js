import express from "express";
import { deleteUser } from "../controllers/staffController.js";
const router = express.Router();
import {
  authStudent,
  getStudentProfile,
  registerStudent,
  forgotPassword,
  resetPassword,
  updateStudent,
  getStudentById,
} from "../controllers/studentController.js";
import {
  admin,
  lecturer,
  protectStudent,
} from "../middleware/authMiddleware.js";

router.route("/").post(registerStudent);
router.post("/login", authStudent);
router
  .route("/profile")
  .get(protectStudent, getStudentProfile)
  .patch(protectStudent, updateStudent);
router.route("/forgot-password").post(forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router
  .route("/:id")
  .delete(protectStudent, admin, deleteUser)
  .get(protectStudent, lecturer, getStudentById);

export default router;
