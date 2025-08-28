import { Request, Response } from "express";
import { Producto } from "../models/ProductoModel";
import validator from "../validators/validator";
import { query, validationResult } from "express-validator";
import { Filter, ILike } from "typeorm";

class ProductoController {
  constructor() {}

  async consultarProductos(req: Request, res: Response) {
    try {
      const data = await Producto.find({
        relations: { category: true },
      });
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async crearProducto(req: Request, res: Response) {
    try {
      const errorsValidation = validationResult(req);
      if (!errorsValidation.isEmpty()) {
        res.status(400).send({
          message: errorsValidation.array()[0].msg,
        });
        return;
      }
      const data = await Producto.save(req.body);
      res.status(201).json("Producto creado");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async actualizarProducto(req: Request, res: Response) {
    try {
      const data = await Producto.update(req.params.id, req.body);
      res.status(200).json("Producto actualizado");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async filterProductsByType(req: Request, res: Response) {
    try {
      if (Number(req.query.categoria) === 0) {
        const data = await Producto.find();

        if (data.length === 0) {
          res.status(404).send({
            message: "No se encontraron productos",
          });
          return;
        }
        res.status(200).json(data);
      } else {
        const data = await Producto.find({
          where: { category: { id: Number(req.query.categoria) } },
          relations: { category: true },
        });

        if (data.length === 0) {
          res.status(404).send({
            message: "No se encontraron productos",
          });
          return;
        }
        res.status(200).json(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const result = await Producto.findOneBy({ id: Number(req.params.id)});
      if(!result){
        res.status(404).send({
          message: "Producto no encontrado",
        });
        return;
      }
      await Producto.delete(req.params.id);
      res.status(200).json("Producto eliminado");
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }
}

export default new ProductoController();
