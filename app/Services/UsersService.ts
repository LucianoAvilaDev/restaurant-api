import Permission from "App/Models/Permission"
import User from "App/Models/User"

class UsersService {

  public static UpdateUserFields = async (id: Number, request: any) => {

    const existingUser: User | null = await this.GetUserById(id as number)

    if (!existingUser) return null

    return {
      ...existingUser,
      name: request.input('name'),
      email: request.input('email'),
      password: request.input('password'),
      roleId: request.input('roleId')
    }

  }

  public static GetUserById = async (id: number) => {

    return await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', id).first()

  }

  public static GetPermissionsByUserId = async (id: number) => {

    const user: User | null = await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', id).first()

    return user?.role.permissions.map((permission: Permission) => {
      return permission.name
    })

  }


}

export default UsersService
