import { Request, Response } from "express";
import { Categoria } from "../models/CategoriaModel";

class categoriasController {
  constructor() {}

  async getCategory(req: Request, res: Response) {
    try {
      const data = await Categoria.find({
        relations: { productos: true },
      });
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const data = await Categoria.save(req.body);
      res.status(201).json("Categoria creada");
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }    

  async updateCategory(req: Request, res: Response) {
    try {
      const data = await Categoria.update(req.params.id, req.body);
      res.status(200).json("Categoria actualizada");
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const data = await Categoria.findOne({
        where: { id: Number(req.params.id) },
        relations: { productos: true }
      });
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new categoriasController();