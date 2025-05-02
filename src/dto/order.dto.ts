import type { OrderData, Order, OrderStatus, FinancialStatus, FulfillmentStatus, OrderQuery } from "@/types/order.type";

const order_status_mapping: Record<OrderStatus, string> = {
  "open": "已開啟",
  "cancelled": "已取消",
  "closed": "已關閉",
}

const financial_status_mapping: Record<FinancialStatus, string> = {
  "paid": "已收到款項",
  "pending": "待付款",
  "refunded": "已退款",
}

const fulfillment_status_mapping: Record<FulfillmentStatus, string> = {
  "received": "已收貨",
  "preparing": "備貨中"
}

export const orderListDto = (content: OrderData[]): Order[] => {
  return content.map((item) => ({
    id: item.id,
    orderName: item.order_name,
    customerName: item.customer_name,
    totalPrice: item.total_price,
    createdAt: item.created_at,
    status: `${order_status_mapping[item.order_status]}/ ${financial_status_mapping[item.financial_status]}/ 
    ${fulfillment_status_mapping[item.fulfillment_status]}`,
    deliveryDateTime: `${item.delivery_date} ${item.delivery_time}`,
    receiverAddress: item.receiver_address,
    note: item.note,
  }))
}

export const orderQueryDto = (query: OrderQuery) => {
  return {
    page: query.page || 1,
    size: query.rowsPerPage,
    'city[]': query.city ? query.city : undefined,
    delivery_date: query.delivery_date ? query.delivery_date : undefined,
    order_status: query.order_status === "all" ? undefined : query.order_status,
    financial_status: query.financial_status === "all" ? undefined : query.financial_status,
    fulfillment_status: query.fulfillment_status === "all" ? undefined : query.fulfillment_status,
  }
}