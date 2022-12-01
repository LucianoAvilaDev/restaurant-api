import Order from "App/Models/Order"

export default class OpenOrderService {

  public static async run(orderId: number): Promise<void> {

    try {

      const orderToOpen: Order = await Order.findOrFail(orderId)

      const openedOrder: Order = {
        ...orderToOpen,
        isClosed: false
      }

      await openedOrder.save()

      return

    }

    catch (e: any) {

      throw e

    }

  }
}
