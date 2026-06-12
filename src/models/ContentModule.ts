import mongoose, { Schema, Document } from "mongoose";

export interface IAdminSectionField {
  id: string;
  label: string;
  type: string;
  value: any;
  options?: string[];
}

export interface IAdminContentRecord {
  id: string;
  title: string;
  type: string;
  status: "Published" | "Draft" | "Archived";
  updatedAt: string;
  fields: IAdminSectionField[];
}

export interface IContentModule extends Document {
  moduleId: string;
  title: string;
  route: string;
  description: string;
  pageType: "Content" | "Commerce" | "Utility" | "Policy";
  records: IAdminContentRecord[];
  createdAt: Date;
  updatedAt: Date;
}

const AdminSectionFieldSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Schema.Types.Mixed },
  options: { type: [String] }
}, { _id: false });

const AdminContentRecordSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String },
  status: { type: String, enum: ["Published", "Draft", "Archived"], default: "Draft" },
  updatedAt: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  fields: [AdminSectionFieldSchema]
}, { _id: false });

const ContentModuleSchema = new Schema<IContentModule>(
  {
    moduleId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    route: { type: String, required: true },
    description: { type: String },
    pageType: { type: String, enum: ["Content", "Commerce", "Utility", "Policy"], default: "Content" },
    records: [AdminContentRecordSchema]
  },
  { timestamps: true }
);

export default mongoose.models.ContentModule || mongoose.model<IContentModule>("ContentModule", ContentModuleSchema);
