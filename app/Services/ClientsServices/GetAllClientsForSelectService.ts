import Client from "App/Models/Client"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllClientsForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const clients: Client[] = await Client.query()

    const selectClients: SelectType[] = clients.map((client: Client) => {
      return {
        key: client.id,
        value: client.name
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectClients
    }

  }
}
