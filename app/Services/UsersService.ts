import Permission from "App/Models/Permission"
import User from "App/Models/User"

class UsersService {



  public static GetUserById = async (id: number) => {

    return await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', id).first()

  }

  public static UpdateUserFields = async (id: Number, request: any) => {

    const existingUser: User | null = await this.GetUserById(id as number)

    if (!existingUser) return null

    existingUser.name = request.input('name')
    existingUser.email = request.input('email')
    existingUser.password = request.input('password')
    existingUser.roleId = request.input('roleId')

    return existingUser

  }

}

export default UsersService
