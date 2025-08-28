import express from "express";
import intranetController from "../controllers/intranetController";
import { authenticateJWT } from "../middlewares/authenticateJWT";

const router = express.Router();

router.get("/panel-admin", authenticateJWT, intranetController.getSaludo);

export default router;