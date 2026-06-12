import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";
import { sendResponse } from "../utils/apiResponse";

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): any => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return sendResponse(res, 403, false, null, "Access denied, admin role required");
};
