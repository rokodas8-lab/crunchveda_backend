import { Router } from "express";
import { getModules, getModuleById, saveSection, deleteSection } from "../controllers/contentController";

const router = Router();

router.get("/modules", getModules);
router.get("/modules/:moduleId", getModuleById);
router.post("/sections", saveSection);
router.delete("/modules/:moduleId/sections/:sectionId", deleteSection);

export default router;
