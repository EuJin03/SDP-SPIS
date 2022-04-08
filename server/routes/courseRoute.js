import express from "express";
import { admin, protectStaff } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourse,
  getCourseDetails,
  getCourseName,
  updateCourse,
} from "../controllers/courseController.js";
const router = express.Router();

router.route("/").get(getCourse).post(protectStaff, admin, createCourse);
router
  .route("/:id")
  .get(getCourseDetails)
  .patch(protectStaff, admin, updateCourse);
router.route("/find").post(getCourseName);

export default router;
