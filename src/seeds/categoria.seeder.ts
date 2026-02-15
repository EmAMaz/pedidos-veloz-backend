import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Categoria } from "../models/CategoriaModel";

export default class CategoriaSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Categoria)
      .values([
        { name: "Con Alcohol" },
        { name: "Sin Alcohol" },
        { name: "Energizante" },
      ])
      .orIgnore()
      .execute();
  }
}
