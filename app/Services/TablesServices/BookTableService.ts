import Table from "App/Models/Table"

export default class BookTableService {

  public static async run(tableId: number): Promise<void> {

    try {

      const tableToBook: Table = await Table.findOrFail(tableId)

      const bookedTable: Table = {
        ...tableToBook,
        isAvailable: false
      }

      await bookedTable.save()

      return

    }

    catch (e: any) {

      throw e

    }

  }
}
