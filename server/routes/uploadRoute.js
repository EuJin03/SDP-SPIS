import { config } from "dotenv";
config();
import express from "express";
import cloudinary from "cloudinary";
import { uploadFile, uploadImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

const cloud_name = process.env.CLOUD_NAME,
  api_key = process.env.CLOUDINARY_API_KEY,
  api_secret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

// @desc upload profile image
// @route /api/uploads/image
// @access Private access
router.post("/image", uploadImage.single("image"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: "eujin03/image-uploads/" + (Date.now() % 7),
      overwrite: true,
      resource_type: "image",
    });
    res.json({
      filepath: req.file.originalname,
      url: uploadResult.url,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Image upload unsuccessfully, please try again later.");
  }
});

// @desc upload assignment files
// @route /api/uploads/file
// @access Private access
router.post("/file", uploadFile.single("file"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: "eujin03/document-uploads/" + req.file.originalname,
      overwrite: true,
      resource_type: "raw",
    });
    res.json({
      filepath: req.file.originalname,
      url: uploadResult.url,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Document upload unsuccessfully, please try again later.");
  }
});

export default router;
