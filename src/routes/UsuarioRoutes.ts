import express from "express";
import usuariosController from "../controllers/usuarioController";

const router = express.Router();

router.post("/registro", usuariosController.createUser)
router.post("/login", usuariosController.loginUser)
router.delete("/:id", usuariosController.deleteUser)
router.post("/token", usuariosController.tokenExpired)

export default router;