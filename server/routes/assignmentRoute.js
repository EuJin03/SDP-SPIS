import express from "express";
const router = express.Router();
import {
  assignTask,
  createAssignment,
  deleteAssignment,
  viewStudentAssignment,
  viewTask,
} from "../controllers/assignmentController.js";
import {
  admin,
  lecturer,
  protectStudent,
  protectStaff,
} from "../middleware/authMiddleware.js";

// student access only
router.route("/view-task").get(protectStudent, viewStudentAssignment);

// lecturer access only
router.route("/uploaded-task").get(protectStaff, viewTask);
router.route("/create-task").post(protectStaff, createAssignment);
router.route("/assign-task/:id").patch(protectStaff, assignTask);
router.route("/:assignmentId").patch(protectStaff, deleteAssignment);

export default router;
