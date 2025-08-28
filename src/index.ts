import app from "./app";
import { AppDataSource } from "./db/connect";
import "reflect-metadata";
import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3001;

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(port, () => {
      console.log("Server activo en el puerto", port);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

main();