import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"

export default class GetRoleByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const role: Role | null = await Role.query().where('id', id).first()

    return {
      message: !role ? "Perfil não encontrado" : 'Sucesso',
      success: !role ? false : true,
      object: role
    }

  }
}
