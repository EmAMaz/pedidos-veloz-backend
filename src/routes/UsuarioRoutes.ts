import express from "express";
import usuariosController from "../controllers/usuarioController";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = express.Router();

router.post("/registro", usuariosController.createUser)
router.post("/login", usuariosController.loginUser)
router.delete("/:id", usuariosController.deleteUser)
router.get("/token", authenticateJWT, usuariosController.tokenExpired)

export default router;