import Order from "App/Models/Order"

export default class CloseOrderService {

  public static async run(orderId: number): Promise<void> {

    try {

      const orderToClose: Order = await Order.findOrFail(orderId)

      orderToClose.isClosed = true

      await orderToClose.save()

      return

    }

    catch (e: any) {

      throw e

    }

  }
}
