import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Producto } from "../models/ProductoModel";
import { Categoria } from "../models/CategoriaModel";

export default class ProductoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(Producto)
      .values([
        {
          name: "producto 1",
          price: 100,
          imagePath:
            "https://s3.amazonaws.com/roypi.com/static/images/default_product.png",
          category: { id: 3 },
        },
        {
          name: "producto 2",
          price: 100,
          imagePath:
            "https://s3.amazonaws.com/roypi.com/static/images/default_product.png",
          category: { id: 2 },
        },
        {
          name: "producto 3",
          price: 100,
          imagePath:
            "https://s3.amazonaws.com/roypi.com/static/images/default_product.png",
          category: { id: 1 },
        },
      ])
      .orIgnore()
      .execute();
  }
}
