import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  name?: string;
  email?: string;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) res.status(401).json({message: "No autorizado"});
    if (authHeader) {
      const decoded = jwt.verify(authHeader.split(" ")[1], "secretKey") as { name: string; email: string };

      req.name = decoded.name;
      req.email = decoded.email;

      next();
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expirado" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Token inválido" });
    }
    res.status(500).json({ message: "Error de autenticación" });
  }
};
