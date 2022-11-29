import Client from "App/Models/Client"
import { ServiceReturnType } from "App/Types/types"
import ClientsValidator from "App/Validators/ClientsValidator"

export default class CreateClientService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const ClientsSchema = ClientsValidator.clientsSchema
      const ClientsMessages = ClientsValidator.clientsMessages

      const payload = await request.validate({ schema: ClientsSchema, messages: ClientsMessages })

      const client: Client = await Client.create(payload)

      return {
        message: "Cliente cadastrado com Sucesso",
        success: true,
        object: client
      }

    }

    catch (e: any) {
      return {
        message: e.message,
        success: false,
        object: null
      }
    }

  }
}
