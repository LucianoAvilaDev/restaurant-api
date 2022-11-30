import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'
import ClientsValidator from 'App/Validators/ClientsValidator'
import UsersValidator from 'App/Validators/UsersValidator'

export default class ClientsController {

  private clientsValidator: any
  private clientsSchema: any
  private clientsMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const clients: Client[] = await Client.all()

      return response.ok(clients)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.clientsValidator = new ClientsValidator(0)

      this.clientsSchema = this.clientsValidator.clientsSchema
      this.clientsMessages = this.clientsValidator.clientsMessages

      const payload: Client = await request.validate({ schema: this.clientsSchema, messages: this.clientsMessages })

      const client: Client = await Client.create(payload)

      return response.ok(client)

    }
    catch (e: any) {

      throw e

    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const client: Client = await Client.findOrFail(params.id)

      return response.ok(client)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }) {

    try {

      this.clientsValidator = new ClientsValidator(params.id)

      this.clientsSchema = this.clientsValidator.clientsSchema
      this.clientsMessages = this.clientsValidator.clientsMessages

      const payload: Client = await request.validate({ schema: this.clientsSchema, messages: this.clientsMessages })

      const existingClient: Client = await Client.findOrFail(params.id)

      existingClient.name = payload.name
      existingClient.cpf = payload.cpf

      const updatedClient: Client = await existingClient.save()

      return response.ok(updatedClient)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const client: Client = await Client.query().preload('orders').where('id', params.id).firstOrFail()

      if (client.orders.length > 0)
        return response.badRequest('Esse Cliente está em um ou mais Pedidos')

      await client.delete()

      return response.ok(client)

    }

    catch (e: any) {

      throw e

    }
  }
}
