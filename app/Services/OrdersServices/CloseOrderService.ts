import Order from 'App/Models/Order'

export default class CloseOrderService {
  public static async run(orderId: number): Promise<void> {
    try {
      await Order.query().where('id', orderId).update({ isClosed: true })

      return
    } catch (e: any) {
      throw e
    }
  }
}
