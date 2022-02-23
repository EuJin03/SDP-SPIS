import express from "express";
import {
  createResource,
  deleteResource,
  editResource,
  getResources,
} from "../controllers/resourceController.js";
import { protectStaff } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getResources)
  .post(protectStaff, createResource)
  .patch(protectStaff, editResource)
  .delete(protectStaff, deleteResource);

export default router;
