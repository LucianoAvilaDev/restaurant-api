import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'
import ClientsValidator from 'App/Validators/ClientsValidator'

export default class ClientsController {

  private clientsSchema: any = ClientsValidator.clientsSchema
  private clientsMessages: CustomMessages = ClientsValidator.clientsMessages

  public async index({ response }: HttpContextContract) {

    try {

      const clients: Client[] = await Client.all()

      return response.ok(clients)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload = await request.validate({ schema: this.clientsSchema, messages: this.clientsMessages })

      const client: Client = await Client.create(payload)

      return response.ok(client)

    }
    catch (e: any) {

      throw new Error(e)

    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const client: Client = await Client.findOrFail(params.id)

      return response.ok(client)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.clientsSchema, messages: this.clientsMessages })

      const existingClient: Client = await Client.findOrFail(params.id)

      existingClient.name = payload.name
      existingClient.cpf = payload.cpf

      const newClient: Client = await existingClient.save()

      return response.ok(newClient)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const client: Client = await Client.query().preload('orders').where('id', params.id).firstOrFail()

      if (client.$hasRelated('orders'))
        return response.badRequest('Esse Cliente está sendo usado por um ou mais Pedidos')

      await client.delete()

      return response.ok(client)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }
}
