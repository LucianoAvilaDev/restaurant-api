import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersFiltersController {
    public async handle({ response, request }: HttpContextContract) {

        const { id, client, table, isClosed } = request.body()

        const Orders: Order[] = await Order.query().preload('client').preload('table')
            .if(id, (OrderQuery: any) => {
                OrderQuery.where('id', "like", `%${id}%`)
            })
            .if(client, (OrderQuery: any) => {
                OrderQuery.whereHas('client', (OrderTypeQuery: any) => {
                    OrderTypeQuery.where('name', 'like', `%${client}%`)
                })
            })
            .if(table, (OrderQuery: any) => {
                OrderQuery.whereHas('table', (OrderTypeQuery: any) => {
                    OrderTypeQuery.where('number', 'like', `%${table}%`)
                })
            })
            .if(isClosed, (OrderQuery: any) => {
                OrderQuery.where('isClosed', "like", `%${isClosed}%`)
            })

        return response.ok(Orders)
    }
}
