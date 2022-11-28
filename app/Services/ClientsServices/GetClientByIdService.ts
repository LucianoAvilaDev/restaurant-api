import Client from "App/Models/Client"
import { ServiceReturnType } from "App/Types/types"

export default class GetClientByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const client: Client | null = await Client.query().where('id', id).first()

    return {
      message: !client ? "Cliente não encontrado" : 'Sucesso',
      success: !client ? false : true,
      object: client
    }

  }
}
