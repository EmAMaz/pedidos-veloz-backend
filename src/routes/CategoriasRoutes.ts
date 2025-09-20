import express from "express";
import categoriasController from "../controllers/categoriasController";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = express.Router();

router.get("/", categoriasController.getCategory);
router.get("/:id", authenticateJWT, categoriasController.getCategoryById);


router.post("/", authenticateJWT, categoriasController.createCategory);
router.put("/:id", authenticateJWT, categoriasController.updateCategory)

export default router;