import type { QTableColumn } from 'quasar'
import { CommonUtils } from "@/utils/common.utils";

export const ORDER_TABLE_COLUMNS: QTableColumn[] = [
  {
    name: "orderName",
    label: "訂單編號",
    align: "left",
    sortable: true,
    field: (row) => row.orderName,
  },
  {
    name: "customerName",
    label: "顧客",
    align: "center",
    sortable: false,
    field: (row) => row.customerName,
  },
  {
    name: "totalPrice",
    label: "金額",
    align: "right",
    field: (row) => row.totalPrice,
    sortable: true,
    format: (val: number) => CommonUtils.toDollar(val),
  },
  {
    name: "createdAt",
    label: "訂單成立時間",
    align: "center",
    sortable: false,
    field: (row) => row.createdAt,
  },
  {
    name: "status",
    label: "訂單狀態",
    align: "center",
    sortable: false,
    field: (row) => row.status,
    style: 'width: 50px'
  },
  {
    name: "deliveryDateTime",
    label: "配送日期與時段",
    align: "center",
    sortable: false,
    field: "deliveryDateTime",
  },
  {
    name: "receiverAddress",
    label: "配送地址",
    align: "left",
    sortable: true,
    field: (row) => row.receiverAddress,
  },
  {
    name: "note",
    label: "備註",
    align: "left",
    sortable: false,
    field: (row) => row.note,
  },
];

export const CITY_OPTIONS = [
  { label: "台北市", value: "台北市" },
  { label: "新北市", value: "新北市" },
  { label: "新竹市", value: "新竹市" },
  { label: "台南市", value: "台南市" },
  { label: "高雄市", value: "高雄市" },
]

export const PAGINATION_OPTIONS = [
  { label: '3 筆', value: 3 },
  { label: '5 筆', value: 5 },
  { label: '7 筆', value: 7 },
  { label: '10 筆', value: 10 },
  { label: '15 筆', value: 15 },
  { label: '20 筆', value: 20 },
  { label: '50 筆', value: 50 },
  { label: '100 筆', value: 100 },
]

export const ORDER_STATUS_OPTIONS = [
  { label: "所有狀態", value: "all" },
  { label: "已開啟", value: "open" },
  { label: "已取消", value: "cancelled" },
  { label: "已關閉", value: "closed" },
]

export const FINANCIAL_STATUS_OPTIONS = [
  { label: "所有狀態", value: "all" },
  { label: "已收到款項", value: "paid" },
  { label: "待付款", value: "pending" },
  { label: "已退款", value: "refunded" },
]

export const FULFILLMENT_STATUS_OPTIONS = [
  { label: "所有出貨狀態", value: "all" },
  { label: "已收貨", value: "received" },
  { label: "備貨中", value: "preparing" }
]