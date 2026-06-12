import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../utils/generateToken";
import { sendResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// Zod validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "customer"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(res, 400, false, null, "User already exists with this email");
    }

    // Create user (password is hashed in pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Save refresh token in HttpOnly cookie
    sendRefreshTokenCookie(res, refreshToken);

    return sendResponse(
      res,
      201,
      true,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
      "User registered successfully"
    );
  } catch (error) {
    return next(error);
  }
};

// @desc    Authenticate user & get tokens
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return sendResponse(res, 401, false, null, "Invalid email or password");
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendResponse(res, 401, false, null, "Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Save refresh token in HttpOnly cookie
    sendRefreshTokenCookie(res, refreshToken);

    return sendResponse(
      res,
      200,
      true,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
      "Logged in successfully"
    );
  } catch (error) {
    return next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (uses cookie)
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return sendResponse(res, 401, false, null, "Refresh token is missing");
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!refreshSecret) {
      throw new Error("JWT_REFRESH_SECRET is not configured");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
      return sendResponse(res, 401, false, null, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendResponse(res, 401, false, null, "User not found associated with this token");
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id.toString(), user.role);

    // Optionally rotate refresh token
    const newRefreshToken = generateRefreshToken(user._id.toString());
    sendRefreshTokenCookie(res, newRefreshToken);

    return sendResponse(
      res,
      200,
      true,
      {
        accessToken,
      },
      "Token refreshed successfully"
    );
  } catch (error) {
    return next(error);
  }
};

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Public/Protected
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    clearRefreshTokenCookie(res);
    return sendResponse(res, 200, true, null, "Logged out successfully");
  } catch (error) {
    return next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user) {
      return sendResponse(res, 401, false, null, "Not authenticated");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    return sendResponse(
      res,
      200,
      true,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      "User profile retrieved successfully"
    );
  } catch (error) {
    return next(error);
  }
};
