import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async index({ response }: HttpContextContract) {

    try {
      const clients: Client[] = await Client.all()
      return response.ok(clients)
    }
    catch (error: any) {
      return error
    }

  }

  public async create({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      const client: Client | null = await Client.find(id)

      if (!client) {
        return response.notFound({ message: 'Cliente não encontrado' })
      }

      return response.ok(client)
    }
    catch (error: any) {
      return error
    }
  }

  public async store({ request, response }: HttpContextContract) {

    try {
      const clientSchema = schema.create({
        name: schema.string([
          rules.maxLength(255)
        ]),
        cpf: schema.string([
          rules.maxLength(11)
        ]),
      })

      const payload: any = await request.validate({ schema: clientSchema })
      const client: Client = await Client.create(payload)

      return response.created(client)
    }
    catch (error: any) {
      return error
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {
      const { id } = params

      const client: Client | null = await Client.find(id)

      if (!client) {
        return response.notFound({ message: 'Cliente não encontrado' })
      }

      return response.ok(client)
    }
    catch (error: any) {
      return error
    }

  }

  public async edit({ params, response }: HttpContextContract) {

    try {
      const { id } = params

      const client: Client | null = await Client.find(id)

      if (!client) {
        return response.notFound({ message: 'Cliente não encontrado' })
      }

      return response.ok(client)
    }
    catch (error: any) {
      return error
    }

  }

  public async update({ request, params, response }) {

    try {
      const clientSchema = schema.create({
        name: schema.string([
          rules.maxLength(255)
        ]),
        cpf: schema.string([
          rules.maxLength(11)
        ]),
      })

      const payload: any = await request.validate({ schema: clientSchema })

      const { id }: { id: Number } = params

      const client: any = await Client.find(id)
      if (!client) {
        return response.notFound({ message: 'Cliente não encontrado' })
      }

      client.name = payload.name
      client.cpf = payload.cpf

      await client.save()

      return response.ok(client)
    }
    catch (error: any) {
      return error
    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {
      const { id } = params

      const client: any = await Client.find(id)
      if (!client) {
        return response.notFound({ message: 'Cliente não encontrado' })
      }

      await client.delete()

      return response.ok({ message: 'Cliente excluído com sucesso.' })
    }
    catch (error: any) {
      return error
    }
  }
}
