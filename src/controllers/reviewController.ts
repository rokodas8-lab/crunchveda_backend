import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Review from "../models/Review";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { sendResponse } from "../utils/apiResponse";

// Zod validation schemas
export const createReviewSchema = z.object({
  product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Product ID",
  }),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(1, "Comment is required"),
});

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { product: productId, rating, comment } = req.body;

    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (alreadyReviewed) {
      return sendResponse(res, 400, false, null, "You have already reviewed this product");
    }

    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    const populatedReview = await Review.findById(review._id).populate("user", "name email");

    return sendResponse(res, 201, true, populatedReview, "Review added successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { product: productId } = req.query;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId as string)) {
      return sendResponse(res, 400, false, null, "Valid product ID query parameter is required");
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return sendResponse(res, 200, true, reviews, "Reviews retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Owner or Admin)
export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return sendResponse(res, 404, false, null, "Review not found");
    }

    // Verify ownership or admin role
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return sendResponse(res, 403, false, null, "Access denied, unauthorized to delete this review");
    }

    // Trigger average recalculation by manually calling one-by-one delete
    await Review.deleteOne({ _id: req.params.id });

    // Manually trigger Mongoose aggregate update
    const ReviewModel = Review.constructor as any;
    if (ReviewModel.calculateAverageRating) {
      await ReviewModel.calculateAverageRating(review.product);
    }

    return sendResponse(res, 200, true, { id: req.params.id }, "Review deleted successfully");
  } catch (error) {
    return next(error);
  }
};
