import Table from "App/Models/Table"

export default class ReleaseTableService {

  public static async run(tableId: number): Promise<void> {

    try {

      const tableToReleas: Table = await Table.findOrFail(tableId)

      tableToReleas.isAvailable = false

      await tableToReleas.save()

      return

    }

    catch (e: any) {

      throw e

    }

  }
}
