import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image")) cb(null, false);
    cb(null, true);
  },
});
