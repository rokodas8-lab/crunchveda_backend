import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendResponse } from "../utils/apiResponse";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: "admin" | "customer";
    name: string;
    email: string;
  };
}

interface JwtPayload {
  id: string;
  role: "admin" | "customer";
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token: string | undefined;

  // Check Authorization header for Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return sendResponse(res, 401, false, null, "Not authorized, token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    // Fetch user from DB, excluding password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return sendResponse(res, 401, false, null, "Not authorized, user not found");
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    };

    return next();
  } catch (error) {
    console.error("Token verification error:", error);
    return sendResponse(res, 401, false, null, "Not authorized, token failed");
  }
};
