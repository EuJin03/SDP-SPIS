import express from "express";
import { admin, protectStaff } from "../middleware/authMiddleware.js";
import { getCourse } from "../controllers/courseController.js";
const router = express.Router();

router.route("/").get(protectStaff, admin, getCourse);

export default router;
