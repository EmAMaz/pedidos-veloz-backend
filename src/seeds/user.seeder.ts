import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Usuario } from '../models/UsuarioModel';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(Usuario);
    
    await repository.insert([
        {'name': 'admin', 'email': 'rB4Ww@example.com', 'password': '123456'},
        {'name': 'user', 'email': 'rB4Ww@example.com', 'password': '123456'},
        {'name': 'user2', 'email': 'rB4Ww@example.com', 'password': '123456'},
    ]);
    
  }
}