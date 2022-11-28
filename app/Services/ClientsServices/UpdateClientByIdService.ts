import Client from "App/Models/Client"
import { ServiceReturnType } from "App/Types/types"
import ClientValidator from "App/Validators/ClientsValidator"
import GetClientByIdService, { } from "./GetClientByIdService"

export default class UpdateClientByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const clientsSchema = ClientValidator.clientsSchema
    const clientsMessages = ClientValidator.clientsMessages

    const payload: any = await request.validate(clientsSchema, clientsMessages)

    const returnObject: ServiceReturnType = await GetClientByIdService.run(id as number)

    if (!returnObject.success)
      throw new Error(returnObject.message)

    const existingClient: Client = returnObject.object as Client

    existingClient.name = payload.name
    existingClient.cpf = payload.cpf

    existingClient.save()

    return { ...returnObject, object: existingClient }

  }
}
