import { Router } from "express";
import {
  createReview,
  getReviews,
  deleteReview,
  createReviewSchema,
} from "../controllers/reviewController";
import { protect } from "../middleware/authMiddleware";
import { validateBody } from "../middleware/validate";

const router = Router();

router.get("/", getReviews);
router.post("/", protect, validateBody(createReviewSchema), createReview);
router.delete("/:id", protect, deleteReview);

export default router;
