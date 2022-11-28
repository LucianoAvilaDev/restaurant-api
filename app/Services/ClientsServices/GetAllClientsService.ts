import Client from "App/Models/Client"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllClientsService {
  public static async run(): Promise<ServiceReturnType> {

    const clients: Client[] = await Client.query()

    return {
      message: 'Sucesso',
      success: true,
      object: clients
    }

  }
}
