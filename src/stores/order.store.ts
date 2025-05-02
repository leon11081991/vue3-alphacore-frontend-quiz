import type { OrderListData, Order, Pagination } from "@/types/order.type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getRequest } from "@/utils/fetch.utils";
import { serviceEntries } from "@/services/index";
import { orderListDto, orderQueryDto } from "@/dto/order.dto";

export const useOrderStore = defineStore("order", () => {
  const isLoading = ref(false)
  const order = ref<Order[]>([])
  const pagination = ref<Pagination>({
    page: 1,
    rowsPerPage: 20,
    max: 0,
    totalElements: 0
  });

  const getOrderList = async (query: any = pagination.value): Promise<void> => {
    isLoading.value = true
    try {
      const queryTransformed = orderQueryDto(query)
      const res = await getRequest<OrderListData>(serviceEntries.getOrders, queryTransformed)
      if (res) {
        order.value = orderListDto(res.content)
        setTotalPages(res)
        setTotalElements(res)
      }
    } catch (error) {
      console.error("getOrderList error", error)
      order.value = []
    } finally {
      isLoading.value = false
    }
  }

  const setTotalPages = (res: OrderListData): void => {
    pagination.value.max = res.total_pages
  }

  const setTotalElements = (res: OrderListData): void => {
    pagination.value.totalElements = res.total_elements
  }

  const resetPage = (): void => {
    pagination.value.page = 1
  }

  return {
    isLoading,
    order,
    pagination,

    getOrderList,
    resetPage
  }
})