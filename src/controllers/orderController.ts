import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Order from "../models/Order";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { sendResponse } from "../utils/apiResponse";

// Zod validation schemas
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: "Invalid Product ID",
        }),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
        price: z.number().nonnegative("Price cannot be negative"),
        size: z.string().optional(),
      })
    )
    .min(1, "Order must have at least one item"),
  shippingAddress: z.string().min(5, "Shipping address must be at least 5 characters long"),
  totalAmount: z.number().nonnegative("Total amount cannot be negative"),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
});

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    // Verify stock availability & product existence
    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return sendResponse(res, 400, false, null, `Product ${item.product} not found`);
      }
      if (dbProduct.stock < item.quantity) {
        return sendResponse(
          res,
          400,
          false,
          null,
          `Insufficient stock for product ${dbProduct.name}. Available: ${dbProduct.stock}`
        );
      }
    }

    // Create the order
    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    // Deduct stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product", "name slug images");

    return sendResponse(res, 201, true, populatedOrder, "Order created successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skipNum = (pageNum - 1) * limitNum;

    const query = { user: req.user.id };
    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("items.product", "name slug images")
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return sendResponse(res, 200, true, orders, "My orders retrieved successfully", {
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name slug images");

    if (!order) {
      return sendResponse(res, 404, false, null, "Order not found");
    }

    // Verify ownership or admin role
    if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return sendResponse(res, 403, false, null, "Access denied, unauthorized view of order");
    }

    return sendResponse(res, 200, true, order, "Order retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private (Admin Only)
export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skipNum = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name slug images")
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return sendResponse(res, 200, true, orders, "All orders retrieved successfully", {
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin Only)
export const updateOrderStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return sendResponse(res, 404, false, null, "Order not found");
    }

    // If order is cancelled, return items to stock
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    // If order is changed from cancelled to something else, deduct stock again
    if (order.status === "cancelled" && status !== "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    order.status = status;
    // Set payment status based on delivery status, or custom rules
    if (status === "delivered") {
      order.paymentStatus = "paid";
    }

    const updatedOrder = await order.save();
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate("user", "name email")
      .populate("items.product", "name slug images");

    return sendResponse(res, 200, true, populatedOrder, "Order status updated successfully");
  } catch (error) {
    return next(error);
  }
};
