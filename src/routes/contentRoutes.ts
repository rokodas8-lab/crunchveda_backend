import { Router } from "express";
import {
  getModules,
  getModuleById,
  saveSection,
  deleteSection,
  getSectionById,
  getHomeHero,
  getHomeCategories,
  getHomeBestSelling,
  getHomeFeatures,
  getHomeGiftBanner,
  getHomeProductDetails,
  getHomeTimeline,
  getHomeFaq
} from "../controllers/contentController";

const router = Router();

router.get("/modules", getModules);
router.get("/modules/:moduleId", getModuleById);
router.get("/modules/:moduleId/sections/:sectionId", getSectionById);

// Specific Homepage Section Routes
router.get("/home/hero", getHomeHero);
router.get("/home/categories", getHomeCategories);
router.get("/home/best-selling", getHomeBestSelling);
router.get("/home/features", getHomeFeatures);
router.get("/home/gift-banner", getHomeGiftBanner);
router.get("/home/product-details", getHomeProductDetails);
router.get("/home/timeline", getHomeTimeline);
router.get("/home/faq", getHomeFaq);

router.post("/sections", saveSection);
router.put("/modules/:moduleId/sections/:sectionId", saveSection);
router.delete("/modules/:moduleId/sections/:sectionId", deleteSection);

export default router;
