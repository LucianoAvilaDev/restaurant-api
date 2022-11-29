import Client from "App/Models/Client"
import { SelectType } from "App/Types/types"

export default class GetAllClientsForSelectService {

  public static async run(): Promise<SelectType[]> {

    const clients: Client[] = await Client.query()

    const selectClients: SelectType[] = clients.map((client: Client) => {
      return {
        key: client.id,
        value: client.name
      }
    })

    return selectClients

  }
}
