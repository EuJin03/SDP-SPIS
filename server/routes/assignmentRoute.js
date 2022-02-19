import express from "express";
const router = express.Router();
import {
  assignTask,
  createTask,
  deleteTask,
  gradePaper,
  updateTask,
  viewPaper,
  viewStudentTask,
  viewTask,
} from "../controllers/assignmentController.js";
import { protectStudent, protectStaff } from "../middleware/authMiddleware.js";

// student access only
router.route("/view-task").get(protectStudent, viewStudentTask);

// lecturer access only
router.route("/uploaded-task").get(protectStaff, viewTask);
router.route("/create-task").post(protectStaff, createTask);
router.route("/assign-task/:assignmentId").patch(protectStaff, assignTask);
router.route("/update-task/:assignmentId").patch(protectStaff, updateTask);
router.route("/:assignmentId").patch(protectStaff, deleteTask);
router
  .route("/grade-paper")
  .get(protectStaff, viewPaper)
  .post(protectStaff, gradePaper);

export default router;
