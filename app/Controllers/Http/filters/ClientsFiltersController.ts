import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class ClientsFiltersController {
    public async handle({ response, request }: HttpContextContract) {

        const { name, cpf } = request.body()

        const clients: Client[] = await Client.query()
            .if(name, (ClientQuery) => {
                ClientQuery.where('name', "like", `%${name}%`)
            })
            .if(cpf, (ClientQuery) => {
                ClientQuery.where('cpf', 'like', `%${cpf}%`)
            })

        return response.ok(clients)
    }
}
