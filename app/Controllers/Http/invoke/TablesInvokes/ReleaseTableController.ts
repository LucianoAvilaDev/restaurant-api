import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReleaseTableService from 'App/Services/TablesServices/ReleaseTableService'


export default class ReleaseTableController {

  public async handle({ params, response }: HttpContextContract) {

    try {

      const tableId: number = params.id

      await ReleaseTableService.run(tableId)

      return response.ok('Mesa liberada com sucesso')

    }

    catch (e: any) {

      throw e

    }

  }

}
