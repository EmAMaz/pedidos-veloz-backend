import app from "./app";
import { AppDataSource } from "./db/connect";
import "reflect-metadata";
import "dotenv/config";
import { configDotenv } from "dotenv";
import { runSeeders } from "typeorm-extension";

configDotenv();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3001;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada con éxito");

    if (process.env.RUN_SEEDS === "true") {
      await runSeeders(AppDataSource);
    }

    app.listen(port, () => {
      console.log("Server activo en el puerto", port);
    });

  } catch (err) {
    if (err instanceof Error) {
      console.error("Error durante el inicio:", err.message);
    }
  }
}

main();