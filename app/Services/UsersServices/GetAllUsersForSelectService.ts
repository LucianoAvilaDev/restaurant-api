import User from "App/Models/User"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllUsersForSelectService {

  public static async run(): Promise<ServiceReturnType> {

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
}
