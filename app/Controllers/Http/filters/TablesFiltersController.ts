import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Table from 'App/Models/Table'

export default class TablesFiltersController {
    public async handle({ response, request }: HttpContextContract) {

        const { number, isAvailable } = request.body()

        const Tables: Table[] = await Table.query()
            .if(number, (TableQuery) => {
                TableQuery.where('number', "like", `%${number}%`)
            })
            .if(isAvailable, (TableQuery) => {
                TableQuery.where('cpf', isAvailable)
            })

        return response.ok(Tables)
    }
}
