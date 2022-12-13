import Order from 'App/Models/Order'

export default class OpenOrderService {
  public static async run(orderId: number): Promise<void> {
    try {
      await Order.query().where('id', orderId).update({ isClosed: false })

      return
    } catch (e: any) {
      throw e
    }
  }
}
