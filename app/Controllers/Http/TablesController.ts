import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Table from 'App/Models/Table'
import TablesValidator from 'App/Validators/TablesValidator'

export default class TablesController {

  private tablesSchema: any = TablesValidator.tablesSchema
  private tablesMessages: CustomMessages = TablesValidator.tablesMessages

  public async index({ response }: HttpContextContract) {

    try {

      const tables: Table[] = await Table.all()

      return response.ok(tables)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload = await request.validate({ schema: this.tablesSchema, messages: this.tablesMessages })

      const table: Table = await Table.create(payload as Table)

      return response.ok(table)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const table: Table = await Table.findOrFail(params.id)

      return response.ok(table)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.tablesSchema, messages: this.tablesMessages })

      const existingTable: Table = await Table.findOrFail(params.id)

      existingTable.number = payload.number
      existingTable.isAvailable = payload.isAvailable

      const updatedTable: Table = await existingTable.save()

      return response.ok(updatedTable)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const table: Table = await Table.query().preload('orders').where(params.id).firstOrFail()


      if (table.$hasRelated('orders'))
        return response.badRequest("Essa Mesa está em um ou mais Pedidos")

      await table.delete()

      return response.ok(table)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }
}
