import { config } from "dotenv";
config();
import express from "express";
import cloudinary from "cloudinary";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
// CLOUD_NAME = eujin03;
// CLOUDINARY_API_KEY = 621247371775937;
// CLOUDINARY_SECRET = zXqhZEQNIxKrNSSKXTDZ7gzHqKs;
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      public_id: "eujin03/image-uploads/" + (Date.now() % 7),
      overwrite: true,
      resource_type: "image",
    });
    res.json({
      success: true,
      url: uploadResult.url,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Image upload unsuccessfully, please try again later.");
  }
});

export default router;
