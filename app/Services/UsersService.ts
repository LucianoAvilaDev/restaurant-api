import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"
import { SelectType, ServiceReturnType } from "App/Types/types"

class UsersService {

  public static GetCurrentUserFullData = async (auth: AuthContract): Promise<ServiceReturnType> => {

    const userId: number | undefined = auth.use('api').user?.id

    if (!userId)
      return {
        message: 'Não autenticado!',
        success: false,
      }

    const users: User[] = await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', userId)

    return {
      message: 'Sucesso',
      success: true,
      object: users
    }

  }

  public static GetAllUsers = async (): Promise<ServiceReturnType> => {

    const users: User[] = await User.query().preload('role')

    return {
      message: 'Sucesso',
      success: true,
      object: users
    }

  }

  public static GetAllUsersForSelect = async (): Promise<ServiceReturnType> => {

    const users: User[] = await User.query()

    const selectUsers: SelectType[] = users.map((value: User, key: number) => {
      return {
        key: key,
        value: value.name
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectUsers
    }

  }

  public static GetUserById = async (id: number): Promise<ServiceReturnType> => {

    const user: User | null = await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', id).first()

    return {
      message: !user ? "Usuário não encontrado" : 'Sucesso',
      success: !user ? false : true,
      object: user
    }

  }

  public static CreateUser = async (request: any): Promise<ServiceReturnType> => {

    const newUser: unknown = {
      name: request.input('name'),
      email: request.input('email'),
      password: request.input('password'),
      roleId: request.input('roleId')
    }

    const user: User = await User.create(newUser as User)

    return {
      message: "Usuário cadastrado com Sucesso",
      success: true,
      object: user
    }

  }

  public static UpdateUser = async (id: Number, request: any): Promise<ServiceReturnType> => {

    const returnObject: ServiceReturnType = await this.GetUserById(id as number)

    if (!returnObject.success)
      throw new Error(returnObject.message)

    const existingUser: User = returnObject.object as User

    existingUser.name = request.input('name')
    existingUser.email = request.input('email')
    existingUser.password = request.input('password')
    existingUser.roleId = request.input('roleId')

    existingUser.save()

    return { ...returnObject, object: existingUser }

  }

  public static DeleteUser = async (id: Number): Promise<ServiceReturnType> => {

    const returnObject: ServiceReturnType = await this.GetUserById(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const user = returnObject.object as User

    if (user.$hasRelated('orders'))
      throw new Error(returnObject.message)

    await user.delete()

    return {
      object: user,
      message: "Usuário excluído com sucesso!",
      success: true
    }

  }

}

export default UsersService
