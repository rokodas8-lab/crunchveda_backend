import { Request, Response } from "express";
import ContentModule from "../models/ContentModule";
import { initialContentModules } from "../config/initialContentModules";

export const getModules = async (req: Request, res: Response): Promise<void> => {
  try {
    let modules = await ContentModule.find();
    if (modules.length === 0) {
      await ContentModule.insertMany(initialContentModules);
      modules = await ContentModule.find();
    }
    res.status(200).json({ success: true, data: modules });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getModuleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.params;
    let module = await ContentModule.findOne({ moduleId });

    if (!module) {
      // Check if it's in the initial dataset but just not in DB yet
      const initial = initialContentModules.find((m) => m.moduleId === moduleId);
      if (initial) {
        // If not in DB, seed all to ensure consistency
        await ContentModule.insertMany(initialContentModules);
        module = await ContentModule.findOne({ moduleId });
      }
    }

    if (!module) {
      res.status(404).json({ success: false, message: "Content module not found" });
      return;
    }

    res.status(200).json({ success: true, data: module });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId, section } = req.body;

    if (!moduleId || !section || !section.id) {
      res.status(400).json({ success: false, message: "moduleId and section are required" });
      return;
    }

    const module = await ContentModule.findOne({ moduleId });
    if (!module) {
      res.status(404).json({ success: false, message: "Content module not found" });
      return;
    }

    // Set updated date
    section.updatedAt = new Date().toISOString().slice(0, 10);

    const recordIndex = module.records.findIndex((r: any) => r.id === section.id);
    if (recordIndex !== -1) {
      // Update existing using set
      module.records[recordIndex].set(section);
    } else {
      // Create new
      module.records.push(section);
    }

    // Mark Mongoose field as modified since it's a subdocument array
    module.markModified("records");
    await module.save();

    res.status(200).json({ success: true, data: section });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId, sectionId } = req.params;

    if (!moduleId || !sectionId) {
      res.status(400).json({ success: false, message: "moduleId and sectionId are required" });
      return;
    }

    const module = await ContentModule.findOne({ moduleId });
    if (!module) {
      res.status(404).json({ success: false, message: "Content module not found" });
      return;
    }

    module.records = module.records.filter((r: any) => r.id !== sectionId);
    module.markModified("records");
    await module.save();

    res.status(200).json({ success: true, data: { id: sectionId } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
