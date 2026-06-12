import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import { sendResponse } from "../utils/apiResponse";

// @desc    Upload an image
// @route   POST /api/upload/image
// @access  Private (Admin Only)
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.file) {
      return sendResponse(res, 400, false, null, "No image file provided");
    }

    // Create a write stream to Cloudinary uploading from memory buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "crunchveda",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return sendResponse(res, 500, false, null, "Failed to upload image to Cloudinary");
        }

        return sendResponse(
          res,
          200,
          true,
          {
            url: result?.secure_url,
            publicId: result?.public_id,
          },
          "Image uploaded successfully"
        );
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    return next(error);
  }
};
