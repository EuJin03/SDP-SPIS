import express from "express";
const router = express.Router();
import {
  authStaff,
  getStaffProfile,
  updateStaff,
  registerStaff,
  forgotPassword,
  resetPassword,
  deleteUser,
} from "../controllers/staffController.js";
import { admin, protectStaff } from "../middleware/authMiddleware.js";

router.route("/").post(registerStaff);
router.post("/login", authStaff);
router
  .route("/profile")
  .get(protectStaff, getStaffProfile)
  .patch(protectStaff, updateStaff);
router.route("/forgot-password").post(forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.route("/:id").delete(protectStaff, admin, deleteUser);

export default router;
