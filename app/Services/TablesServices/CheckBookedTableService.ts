import Order from "App/Models/Order"
import Table from "App/Models/Table"

export default class CheckBookedTableService {

  public static async run(orderId: number, tableId: number): Promise<boolean> {

    try {

      const order: Order = await Order.findOrFail(orderId)

      const table: Table = await Table.findOrFail(tableId)

      return (table.isAvailable || (!table.isAvailable && order.tableId == tableId))

    }

    catch (e: any) {

      throw e

    }

  }
}
