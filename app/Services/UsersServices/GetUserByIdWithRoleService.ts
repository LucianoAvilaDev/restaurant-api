import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"

export default class GetUserByIdWithRoleService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const user: User | null = await User.query().preload('role').where('id', id).first()

    return {
      message: !user ? "Usuário não encontrado" : 'Sucesso',
      success: !user ? false : true,
      object: user
    }

  }
}
