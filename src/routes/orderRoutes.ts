import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  createOrderSchema,
  updateOrderStatusSchema,
} from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/adminMiddleware";
import { validateBody } from "../middleware/validate";

const router = Router();

// Apply protect middleware to all routes below
router.use(protect);

// Customer routes
router.post("/", validateBody(createOrderSchema), createOrder);
router.get("/my-orders", getMyOrders);
router.get("/:id", getOrderById);

// Admin-only routes
router.get("/", adminOnly, getAllOrders);
router.put("/:id/status", adminOnly, validateBody(updateOrderStatusSchema), updateOrderStatus);

export default router;
