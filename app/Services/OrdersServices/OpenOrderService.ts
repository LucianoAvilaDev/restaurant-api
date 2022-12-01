import Order from "App/Models/Order"

export default class OpenOrderService {

  public static async run(orderId: number): Promise<void> {

    try {

      const orderToOpen: Order = await Order.findOrFail(orderId)

      orderToOpen.isClosed = false

      await orderToOpen.save()

      return

    }

    catch (e: any) {

      throw e

    }

  }
}
