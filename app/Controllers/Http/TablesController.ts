import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Table from 'App/Models/Table'
import TablesValidator from 'App/Validators/TablesValidator'

export default class TablesController {

  private tablesValidator: any
  private tablesSchema: any
  private tablesMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const tables: Table[] = await Table.all()

      return response.ok(tables)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.tablesValidator = new TablesValidator()

      this.tablesSchema = this.tablesValidator.tablesSchema
      this.tablesMessages = this.tablesValidator.tablesMessages

      const payload = await request.validate({ schema: this.tablesSchema, messages: this.tablesMessages })

      const table: Table = await Table.create(payload as Table)

      return response.ok(table)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const table: Table = await Table.findOrFail(params.id)

      return response.ok(table)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }) {

    try {

      this.tablesValidator = new TablesValidator()

      this.tablesSchema = this.tablesValidator.tablesSchema
      this.tablesMessages = this.tablesValidator.tablesMessages

      const payload: any = await request.validate({ schema: this.tablesSchema, messages: this.tablesMessages })

      const existingTable: Table = await Table.findOrFail(params.id)

      existingTable.number = payload.number
      existingTable.isAvailable = payload.isAvailable

      const updatedTable: Table = await existingTable.save()

      return response.ok(updatedTable)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const table: Table = await Table.query().preload('orders').where('id', params.id).firstOrFail()


      if (table.orders.length > 0)
        return response.badRequest("Essa Mesa está em um ou mais Pedidos")

      await table.delete()

      return response.ok(table)

    }

    catch (e: any) {

      throw e

    }
  }
}
