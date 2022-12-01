import BookTableService from 'App/Services/TablesServices/BookTableService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BookTableController {

  public async handle({ params, response }: HttpContextContract) {

    try {

      const tableId: number = params.id

      await BookTableService.run(tableId)

      return response.ok('Mesa reservada com sucesso')

    }

    catch (e: any) {

      throw e

    }

  }

}
