import { Router } from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductSchema,
  updateProductSchema,
} from "../controllers/productController";
import { validateBody } from "../middleware/validate";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Protected Admin routes
router.post("/", protect, adminOnly, validateBody(createProductSchema), createProduct);
router.put("/:id", protect, adminOnly, validateBody(updateProductSchema), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
