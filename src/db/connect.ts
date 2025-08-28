import { DataSource } from "typeorm";
import { Producto } from "../models/ProductoModel";
import { Categoria } from "../models/CategoriaModel";
import { Usuario } from "../models/UsuarioModel";
import { configDotenv } from "dotenv";

configDotenv();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Producto, Categoria, Usuario],
  subscribers: [],
  migrations: [],
});
