import express from "express";
const router = express.Router();
import {
  assignTask,
  createTask,
  deleteTask,
  gradePaper,
  submitAssignment,
  updateTask,
  viewPaper,
  viewSingleStudentTask,
  viewSingleTask,
  viewStudentTask,
  viewTask,
} from "../controllers/assignmentController.js";
import { protectStudent, protectStaff } from "../middleware/authMiddleware.js";

// student access only
router.route("/view-task").get(protectStudent, viewStudentTask);
router
  .route("/view-task/:submissionId")
  .get(protectStudent, viewSingleStudentTask);
router
  .route("/submit-task/:submissionId")
  .post(protectStudent, submitAssignment);

// lecturer access only
router.route("/uploaded-task").get(protectStaff, viewTask);
router.route("/uploaded-task/:taskId").get(protectStaff, viewSingleTask);
router.route("/create-task").post(protectStaff, createTask);
router.route("/assign-task/:assignmentId").patch(protectStaff, assignTask);
router.route("/update-task/:assignmentId").patch(protectStaff, updateTask);
router.route("/:assignmentId").delete(protectStaff, deleteTask);
router
  .route("/grade-paper")
  .get(protectStaff, viewPaper)
  .post(protectStaff, gradePaper);

export default router;
