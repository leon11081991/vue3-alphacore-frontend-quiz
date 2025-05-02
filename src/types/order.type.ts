export interface OrderQuery {
  page: number,
  rowsPerPage: number,
  city?: string[],
  delivery_date?: string,
  order_status?: OrderStatus | "all",
  financial_status?: FinancialStatus | "all",
  fulfillment_status?: FulfillmentStatus | "all"
}

export interface OrderListData {
  content: OrderData[];
  pageable: {
    sort: SortInfo;
    offset: number;
    page_number: number;
    page_size: number;
    paged: boolean;
    unpaged: boolean;
  };
  total_pages: number;
  total_elements: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export type OrderStatus = "open" | "cancelled" | "closed"
export type FinancialStatus = "paid" | "pending" | "refunded"
export type FulfillmentStatus = "received" | "preparing"

export interface OrderData {
  id: number,
  order_name: string,
  customer_name: string,
  order_status: OrderStatus,
  financial_status: FinancialStatus,
  fulfillment_status: FulfillmentStatus,
  created_at: string,
  total_price: number
  receiver_address: string,
  delivery_date: string,
  note: string,
  delivery_time: string,
  shipping_name: string,
  city: string,
  district: string,
  internal_note: string,
}

export interface Order {
  id: number
  orderName: string // 訂單編號
  customerName: string // 顧客
  totalPrice: number // 金額
  createdAt: string // 訂單成立時間
  status: string // 訂單狀態
  deliveryDateTime: string // 配送日期與時段
  receiverAddress: string // 配送地址
  note: string // 備註
}

export type FilterKey = keyof FilterForm
export interface FilterForm {
  city: string[]
  delivery_date: string
  order_status: OrderStatus | "all"
  financial_status: FinancialStatus | "all"
  fulfillment_status: FulfillmentStatus | "all"
}

export interface Pagination {
  page: number
  rowsPerPage: number
  max: number
  totalElements: number
}

export interface PaginationOption {
  label: string;
  value: number;
}