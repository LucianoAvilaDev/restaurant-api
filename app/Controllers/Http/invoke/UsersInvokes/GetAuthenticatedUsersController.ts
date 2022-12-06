// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import GetCurrentUserFullDataService from 'App/Services/UsersServices/GetCurrentUserFullDataService'


export default class GetAuthenticatedUsersController {
  public async handle({  auth, response }: HttpContextContract) {

    try {

      const currUser: User = await GetCurrentUserFullDataService.run(auth)

      return response.ok( {
        id: currUser.id,
        name: currUser.name,
        email: currUser.email,
        permissions: currUser.role.permissions.map((permissions:Permission)=>{
          return permissions.name
        }),
      })

    }

    catch (e: any) {

      throw e

    }

  }
}
