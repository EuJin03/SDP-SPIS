import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

// upload images
export const uploadImage = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image")) cb(null, false);
    cb(null, true);
  },
});

// Check file types
const checkFileType = (file, cb) => {
  const filetypes = /doc|docx|xls|xlsx|ppt|pptx|txt|csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Documents only");
  }
};

// upload files
export const uploadFile = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 ** 2 },
});
