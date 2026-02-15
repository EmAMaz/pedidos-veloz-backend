import { DataSource, DataSourceOptions } from "typeorm";
import { Producto } from "../models/ProductoModel";
import { Categoria } from "../models/CategoriaModel";
import { Usuario } from "../models/UsuarioModel";
import { configDotenv } from "dotenv";
import { SeederOptions } from "typeorm-extension";
import ProductoSeeder from "../seeds/producto.seeder";
import CategoriaSeeder from "../seeds/categoria.seeder";
import UserSeeder from "../seeds/user.seeder";

configDotenv();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL_DEV,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  synchronize: false,
  logging: true,
  entities: [Producto, Categoria, Usuario],
  subscribers: [],
  migrations: ["./src/migrations/*.ts"],
  seeds: [],
}

export const AppDataSource = new DataSource(options);
