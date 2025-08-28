import express from "express";
import categoriasController from "../controllers/categoriasController";

const router = express.Router();

router.get("/", categoriasController.getCategory);
router.get("/:id", categoriasController.getCategoryById);


router.post("/", categoriasController.createCategory);
router.put("/:id", categoriasController.updateCategory)

export default router;