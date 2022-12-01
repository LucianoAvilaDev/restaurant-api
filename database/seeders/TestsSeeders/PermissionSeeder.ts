import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    await Permission.createMany([
      {
        id: 1,
        name: 'manage_users',
        description: 'Gerenciar usuários',
      },
      {
        id: 2,
        name: 'manage_clients',
        description: 'Gerenciar clientes',
      },
      {
        id: 3,
        name: 'manage_orders',
        description: 'Gerenciar pedidos',
      },
      {
        id: 4,
        name: 'manage_meals',
        description: 'Gerenciar refeições',
      },
      {
        id: 5,
        name: 'manage_roles',
        description: 'Gerenciar perfis',
      }
    ])
  }
}
