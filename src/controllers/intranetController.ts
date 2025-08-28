import { Request, Response } from "express";
import { Categoria } from "../models/CategoriaModel";
import { AuthenticatedRequest } from "../middlewares/authenticateJWT";

class intranetController {
  constructor() {}

  async getSaludo(req: AuthenticatedRequest, res: Response) {
    try {
      res.status(200).json({message: `Acceso autorizado ${req.name}`});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new intranetController();
