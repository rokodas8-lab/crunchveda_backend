import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Product from "../models/Product";
import Category from "../models/Category";
import { sendResponse } from "../utils/apiResponse";

// Zod validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  stock: z.number().int().nonnegative("Stock cannot be negative").default(100),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Category ID",
  }),
  badge: z.string().optional(),
  dietary: z.array(z.string()).optional().default([]),
  sizePrices: z.record(z.number()).optional().default({}),
  defaultSize: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  slug: z.string().min(1, "Slug cannot be empty").optional(),
  description: z.string().min(1, "Description cannot be empty").optional(),
  price: z.number().nonnegative("Price cannot be negative").optional(),
  stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
  images: z.array(z.string()).min(1, "At least one image is required").optional(),
  category: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid Category ID",
    })
    .optional(),
  badge: z.string().optional(),
  dietary: z.array(z.string()).optional(),
  sizePrices: z.record(z.number()).optional(),
  defaultSize: z.string().optional(),
  isActive: z.boolean().optional(),
});

// @desc    Get all products (public) with search, category filtering & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { search, category, page = 1, limit = 10, all } = req.query;

    const query: any = {};
    if (all !== "true") {
      query.isActive = true;
    }

    // Search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category query (handles slug or ID)
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category as string)) {
        query.category = category;
      } else {
        const foundCategory = await Category.findOne({
          $or: [{ slug: category as string }, { name: category as string }],
        });
        if (foundCategory) {
          query.category = foundCategory._id;
        } else {
          // If category name/slug is given but doesn't exist, return empty response
          return sendResponse(res, 200, true, [], "No products found for this category", {
            page: Number(page),
            limit: Number(limit),
            total: 0,
          });
        }
      }
    }

    // Pagination variables
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skipNum = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category", "name slug image isActive")
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return sendResponse(res, 200, true, products, "Products retrieved successfully", {
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get bestseller products
// @route   GET /api/products/bestsellers
// @access  Public
export const getBestsellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const products = await Product.find({
      isActive: true,
      badge: { $regex: /best\s*seller/i },
    }).populate("category", "name slug image isActive");

    return sendResponse(res, 200, true, products, "Bestseller products retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get products by category slug
// @route   GET /api/products/category/:categorySlug
// @access  Public
export const getProductsByCategorySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const categorySlug = req.params.categorySlug || req.params.slug;
    const { page = 1, limit = 10 } = req.query;

    const foundCategory = await Category.findOne({
      $or: [{ slug: categorySlug }, { name: categorySlug }],
    });

    if (!foundCategory) {
      return sendResponse(res, 404, false, null, "Category not found");
    }

    const query = {
      category: foundCategory._id,
      isActive: true,
    };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skipNum = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category", "name slug image isActive")
      .sort({ createdAt: -1 })
      .skip(skipNum)
      .limit(limitNum);

    return sendResponse(res, 200, true, products, "Category products retrieved successfully", {
      page: pageNum,
      limit: limitNum,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category",
      "name slug image isActive"
    );

    if (!product) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    return sendResponse(res, 200, true, product, "Product retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin Only)
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const body = req.body;

    // Verify Category exists
    const categoryExists = await Category.findById(body.category);
    if (!categoryExists) {
      return sendResponse(res, 400, false, null, "Category reference does not exist");
    }

    // Check unique slug
    const slugExists = await Product.findOne({ slug: body.slug.toLowerCase() });
    if (slugExists) {
      return sendResponse(res, 400, false, null, "Product with this slug already exists");
    }

    const product = await Product.create({
      ...body,
      slug: body.slug.toLowerCase(),
    });

    return sendResponse(res, 201, true, product, "Product created successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private (Admin Only)
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    const body = req.body;

    if (body.category) {
      const categoryExists = await Category.findById(body.category);
      if (!categoryExists) {
        return sendResponse(res, 400, false, null, "Category reference does not exist");
      }
    }

    if (body.slug && body.slug.toLowerCase() !== product.slug) {
      const slugExists = await Product.findOne({ slug: body.slug.toLowerCase() });
      if (slugExists) {
        return sendResponse(res, 400, false, null, "Product with this slug already exists");
      }
      product.slug = body.slug.toLowerCase();
    }

    // Update fields
    const fieldsToUpdate = [
      "name",
      "description",
      "price",
      "stock",
      "images",
      "category",
      "badge",
      "dietary",
      "sizePrices",
      "defaultSize",
      "isActive",
    ];

    fieldsToUpdate.forEach((field) => {
      if (body[field] !== undefined) {
        if (field === "sizePrices") {
          // Convert regular object to Map for Mongoose
          product.sizePrices = new Map(Object.entries(body.sizePrices));
        } else {
          (product as any)[field] = body[field];
        }
      }
    });

    const updatedProduct = await product.save();
    return sendResponse(res, 200, true, updatedProduct, "Product updated successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin Only)
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendResponse(res, 404, false, null, "Product not found");
    }

    await Product.deleteOne({ _id: req.params.id });

    return sendResponse(res, 200, true, { id: req.params.id }, "Product deleted successfully");
  } catch (error) {
    return next(error);
  }
};
