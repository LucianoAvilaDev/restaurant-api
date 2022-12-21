import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersFiltersController {
  public async handle({ response, request }: HttpContextContract) {

    const { id, client, table, date, isClosed } = request.body()

    const Orders: Order[] = await Order.query().preload('client').preload('table')
      .if(id, (OrderQuery: any) => {
        OrderQuery.where('id', "like", `%${id}%`)
      })
      .if(date, (OrderQuery: any) => {
        OrderQuery.where('date', "like", `${date}%`)
      })
      .if(client, (OrderQuery: any) => {
        OrderQuery.where('clientId', 'like', `%${client}%`)
      })
      .if(table, (OrderQuery: any) => {
        OrderQuery.where('tableId', 'like', `%${table}%`)
      })
      .if(isClosed && isClosed == 'true', (OrderQuery) => {
        OrderQuery.where('isClosed', true)
      })
      .if(isClosed && isClosed == 'false', (OrderQuery) => {
        OrderQuery.where('isClosed', false)
      })

    return response.ok(Orders)
  }
}
