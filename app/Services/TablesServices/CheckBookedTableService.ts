import Table from "App/Models/Table"

export default class CheckBookedTableService {

  public static async run(tableId: number): Promise<boolean> {

    try {

      const table: Table = await Table.findOrFail(tableId)

      return table.isAvailable

    }

    catch (e: any) {

      throw e

    }

  }
}
