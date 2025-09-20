import express from "express";
import productoController from "../controllers/productoController";
import validator from "../validators/validator";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = express.Router();

router.get("/", productoController.consultarProductos);

router.post("/", authenticateJWT, validator.emptyFields(["name", "price", "category"]), productoController.crearProducto);
router.put("/:id", authenticateJWT, productoController.actualizarProducto)
router.get("/filter", productoController.filterProductsByType)
router.delete("/:id", authenticateJWT, productoController.deleteProduct)

export default router;