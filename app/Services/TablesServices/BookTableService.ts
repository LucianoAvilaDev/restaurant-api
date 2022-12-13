import Table from 'App/Models/Table'

export default class BookTableService {
  public static async run(tableId: number): Promise<void> {
    try {
      await Table.query().where('id', tableId).update({ isAvailable: false })

      return
    } catch (e: any) {
      throw e
    }
  }
}
