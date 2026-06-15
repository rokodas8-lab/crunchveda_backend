import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

const router = Router();

// Multer memory storage setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept image formats
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed") as any, false);
    }
  },
});

// In development, bypass protect and adminOnly middlewares for testing
const uploadMiddlewares = process.env.NODE_ENV === "development"
  ? [upload.single("image")]
  : [protect, adminOnly, upload.single("image")];

router.post("/image", uploadMiddlewares as any, uploadImage);

export default router;
