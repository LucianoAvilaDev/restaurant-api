import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Table from 'App/Models/Table'

export default class GetAvailableTablesController {

  public async handle({ response }: HttpContextContract) {

    try {

      const availableTables: Table[] = await Table.query().where('isAvailable', true)

      return response.ok(availableTables)

    }

    catch (e: any) {

      throw e

    }

  }

}
