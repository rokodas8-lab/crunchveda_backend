import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  createCategorySchema,
  updateCategorySchema,
} from "../controllers/categoryController";
import { validateBody } from "../middleware/validate";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);

// Protected Admin routes
router.post("/", protect, adminOnly, validateBody(createCategorySchema), createCategory);
router.put("/:id", protect, adminOnly, validateBody(updateCategorySchema), updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
