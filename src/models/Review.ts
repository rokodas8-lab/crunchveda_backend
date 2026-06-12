import mongoose, { Schema, Document } from "mongoose";
import Product from "./Product";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required for a review"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required for a review"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from submitting multiple reviews for the same product
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method to calculate average rating and rating count of a product
ReviewSchema.statics.calculateAverageRating = async function (productId: mongoose.Types.ObjectId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        "ratings.average": Math.round(stats[0].averageRating * 10) / 10,
        "ratings.count": stats[0].numOfReviews,
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        "ratings.average": 0,
        "ratings.count": 0,
      });
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
  }
};

// Post-save hook to calculate average rating
ReviewSchema.post<IReview>("save", async function (doc) {
  const ReviewModel = this.constructor as any;
  await ReviewModel.calculateAverageRating(doc.product);
});

// Post-delete hook to calculate average rating when a review is deleted
ReviewSchema.post<IReview>("deleteOne", { document: true, query: false }, async function (doc) {
  const ReviewModel = this.constructor as any;
  await ReviewModel.calculateAverageRating(doc.product);
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
