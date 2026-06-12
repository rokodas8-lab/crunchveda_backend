import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import Category from "../models/Category";
import { sendResponse } from "../utils/apiResponse";

// Zod validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  slug: z.string().min(1, "Slug cannot be empty").optional(),
  description: z.string().min(1, "Description cannot be empty").optional(),
  image: z.string().optional(),
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, categories, "Categories retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
export const getCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return sendResponse(res, 404, false, null, "Category not found");
    }
    return sendResponse(res, 200, true, category, "Category retrieved successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private (Admin Only)
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, slug, description, image } = req.body;

    const categoryExists = await Category.findOne({ slug: slug.toLowerCase() });
    if (categoryExists) {
      return sendResponse(res, 400, false, null, "Category with this slug already exists");
    }

    const category = await Category.create({
      name,
      slug: slug.toLowerCase(),
      description,
      image: image || "",
    });

    return sendResponse(res, 201, true, category, "Category created successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin Only)
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, slug, description, image } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendResponse(res, 404, false, null, "Category not found");
    }

    if (slug && slug.toLowerCase() !== category.slug) {
      const slugExists = await Category.findOne({ slug: slug.toLowerCase() });
      if (slugExists) {
        return sendResponse(res, 400, false, null, "Category with this slug already exists");
      }
      category.slug = slug.toLowerCase();
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (image !== undefined) category.image = image;

    const updatedCategory = await category.save();

    return sendResponse(res, 200, true, updatedCategory, "Category updated successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin Only)
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendResponse(res, 404, false, null, "Category not found");
    }

    await Category.deleteOne({ _id: req.params.id });

    return sendResponse(res, 200, true, { id: req.params.id }, "Category deleted successfully");
  } catch (error) {
    return next(error);
  }
};
