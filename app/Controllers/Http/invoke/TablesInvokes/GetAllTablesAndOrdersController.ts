import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HasManyQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'
import Table from 'App/Models/Table'

export default class GetAllTablesAndOrdersController {

  public async handle({ params, response }: HttpContextContract) {

    try {

      const occupiedTables: Table[] = await Table.query().preload('orders', (query: HasManyQueryBuilderContract<typeof Order, any>) => {
        query.preload('client').preload('orderItems', (queryItems: any) => {
          queryItems.preload('meal')
        }).orderBy('date', 'desc').first()
      }).where('isAvailable', false)

      const freeTables: Table[] = await Table.query().where('isAvailable', true)

      const allTables: Table[] = [...occupiedTables, ...freeTables].sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))

      return response.ok(allTables)

    }

    catch (e: any) {

      throw e

    }

  }

}
