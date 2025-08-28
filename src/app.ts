import "reflect-metadata";
import express, { Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import productosRoutes from "./routes/ProductoRoutes";
import categoriasRoutes from "./routes/CategoriasRoutes";
import usuariosRoutes from "./routes/UsuarioRoutes";
import intranetRoutes from "./routes/IntranetRoutes";
import cors from "cors";
import session from "express-session";

const app = express();

type User = {
  id: string;
  email: string;
};

declare module "express-session" {
  export interface SessionData {
    user?: User;
  }
}

app.use(bodyParser.json());
app.use(cors());

app.use("/intranet", intranetRoutes)
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/usuario", usuariosRoutes);

app.use(errorHandler);

export default app;
