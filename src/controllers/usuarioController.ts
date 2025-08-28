import { NextFunction, Request, RequestHandler, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import userService from "../services/userService";
import { Usuario } from "../models/UsuarioModel";
import jwt from "jsonwebtoken";

class UsuariosController {
  private validateRegister: ValidationChain[] = [
    body("email", "El email no es valido").isEmail(),
    body("password", "La contraseña debe tener al menos 6 caracteres").isLength(
      { min: 6 }
    ),
  ];

  public registerUser = [
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errorsValidation = validationResult(req);
        if (!errorsValidation.isEmpty()) {
          res.status(400).send({
            message: errorsValidation.array()[0].msg,
          });
          return;
        }
        const { email, password } = req.body;
        await userService.createUser(email, password);

        res.status(200).send({
          message: "Usuario creado correctamente",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error al crear el usuario",
        });
        return;
      }
    },
  ];

  public async getRegisterUserHandler() {
    return [this.validateRegister, this.registerUser];
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.query;

      const validationResult = await Usuario.find({
        where: { email: email as string, password: password as string },
      });

      if (validationResult.length > 0) {
        res.status(400).send({
          message: "El email ya esta registrado",
        });
        return;
      }

      const data = await Usuario.save({
        name: name as string,
        email: email as string,
        password: password as string,
      });

      res.status(200).send({
        message: "Usuario creado correctamente",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.status(400).send({
          message: result.array()[0].msg,
        });
        return;
      }

      const { email, password } = req.query;
      const data = await Usuario.find({
        where: { email: email as string, password: password as string },
      });

      if (data.length === 0) {
        res.status(404).send({
          message: "Credenciales Incorrectas",
        });
        return;
      }

      const generatedtoken = jwt.sign(
        { name: data[0].name, email },
        "secretKey",
        { expiresIn: "1h" }
        // { expiresIn: "60000" }1minuto
      );

      res.status(200).json({ data, token: generatedtoken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await Usuario.findOneBy({ id: Number(id) });

      if (!data) {
        res.status(404).send({
          message: "Usuario no encontrado",
        });
        return;
      }
      await Usuario.delete(id);
      res.status(200).send({
        message: "Usuario eliminado correctamente",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message);
      }
    }
  }

  async tokenExpired(req: Request, res: Response) {
    const { token } = req.body;
    try {
      await new Promise((resolve, reject) => {
        jwt.verify(token, "secretKey", (err: any, decoded: any) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });
      res.status(200).json({ message: "Token válido" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(401).send({
          message:
            err.name === "TokenExpiredError"
              ? "Token expirado"
              : "Token inválido",
        });
      }
    }
  }
}

export default new UsuariosController();
