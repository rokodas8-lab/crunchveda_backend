import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number; // default or starting price
  stock: number; // general stock count
  images: string[];
  category: mongoose.Types.ObjectId;
  ratings: {
    average: number;
    count: number;
  };
  isActive: boolean;
  badge?: string; // e.g. "ORGANIC", "BEST SELLER"
  dietary: string[]; // e.g. ["Organic", "Raw"]
  sizePrices: Map<string, number>; // e.g. { "250g": 13.0, "500g": 24.0 }
  defaultSize?: string; // e.g. "500g"
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 100,
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
      validate: {
        validator: function (val: string[]) {
          return val.length > 0;
        },
        message: "Product must have at least one image",
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, "Rating average cannot be negative"],
        max: [5, "Rating average cannot exceed 5"],
      },
      count: {
        type: Number,
        default: 0,
        min: [0, "Rating count cannot be negative"],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      default: "",
    },
    dietary: {
      type: [String],
      default: [],
    },
    sizePrices: {
      type: Map,
      of: Number,
      default: {},
    },
    defaultSize: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
