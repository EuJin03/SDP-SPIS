import express from "express";
import { admin, protectStaff } from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourse,
  updateCourse,
} from "../controllers/courseController.js";
const router = express.Router();

router
  .route("/")
  .get(protectStaff, admin, getCourse)
  .post(protectStaff, admin, createCourse);
router.route("/:id").patch(protectStaff, admin, updateCourse);
export default router;
