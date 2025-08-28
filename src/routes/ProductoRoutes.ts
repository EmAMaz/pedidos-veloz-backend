import express from "express";
import productoController from "../controllers/productoController";
import validator from "../validators/validator";

const router = express.Router();

router.get("/", productoController.consultarProductos);

router.post("/", validator.emptyFields(["name", "price", "category"]) ,productoController.crearProducto);
router.put("/:id", productoController.actualizarProducto)
router.get("/filter", productoController.filterProductsByType)
router.delete("/:id", productoController.deleteProduct)

export default router;