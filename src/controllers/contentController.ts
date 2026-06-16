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
    // Support both:
    //   POST /sections (body: { moduleId, section: { id, ... } })
    //   PUT  /modules/:moduleId/sections/:sectionId (body: { section: { ... } })
    const moduleId: string = req.params.moduleId || req.body.moduleId;
    let section: any = req.body.section || req.body;

    // When called via PUT route, ensure section.id is set from URL param
    if (req.params.sectionId && !section.id) {
      section = { ...section, id: req.params.sectionId };
    }

    if (!moduleId || !section || !section.id) {
      res.status(400).json({ success: false, message: "moduleId and section (with id) are required" });
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

// Helper to parse field values into key-value pairs
export const parseFields = (fields: any[]): Record<string, any> => {
  const content: Record<string, any> = {};
  if (Array.isArray(fields)) {
    for (const field of fields) {
      content[field.id] = field.value;
    }
  }
  return content;
};

export const getSectionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId, sectionId } = req.params;
    let module = await ContentModule.findOne({ moduleId });

    if (!module) {
      const initial = initialContentModules.find((m) => m.moduleId === moduleId);
      if (initial) {
        await ContentModule.insertMany(initialContentModules);
        module = await ContentModule.findOne({ moduleId });
      }
    }

    if (!module) {
      res.status(404).json({ success: false, message: "Content module not found" });
      return;
    }

    const section = module.records.find((r: any) => r.id === sectionId);
    if (!section) {
      res.status(404).json({ success: false, message: "Section not found" });
      return;
    }

    // Convert Mongoose document to plain object so we can add 'content' property
    const sectionObj = typeof section.toObject === "function" ? section.toObject() : section;
    const content = parseFields(sectionObj.fields);

    res.status(200).json({
      success: true,
      data: {
        ...sectionObj,
        content
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Private Helper to fetch a section and return formatted data
const fetchSectionHelper = async (moduleId: string, sectionId: string, res: Response): Promise<void> => {
  try {
    let module = await ContentModule.findOne({ moduleId });

    if (!module) {
      const initial = initialContentModules.find((m) => m.moduleId === moduleId);
      if (initial) {
        await ContentModule.insertMany(initialContentModules);
        module = await ContentModule.findOne({ moduleId });
      }
    }

    if (!module) {
      res.status(404).json({ success: false, message: "Content module not found" });
      return;
    }

    const section = module.records.find((r: any) => r.id === sectionId);
    if (!section) {
      res.status(404).json({ success: false, message: "Section not found" });
      return;
    }

    const sectionObj = typeof section.toObject === "function" ? section.toObject() : section;
    const content = parseFields(sectionObj.fields);

    res.status(200).json({
      success: true,
      data: {
        ...sectionObj,
        content
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHomeHero = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-hero", res);
};

export const getHomeCategories = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-categories", res);
};

export const getHomeBestSelling = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-best-selling", res);
};

export const getHomeFeatures = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-features", res);
};

export const getHomeGiftBanner = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-gift-banner", res);
};

export const getHomeProductDetails = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-product-details", res);
};

export const getHomeTimeline = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-timeline", res);
};

export const getHomeFaq = async (req: Request, res: Response): Promise<void> => {
  await fetchSectionHelper("home", "home-faq", res);
};
