<script setup lang="ts">
import type { FilterKey, FilterForm } from "@/types/order.type";
import { QBtn, QSelect, QTable, QInnerLoading, QPagination } from "quasar";
import { onMounted, ref } from "vue";
import {
  ORDER_TABLE_COLUMNS,
  CITY_OPTIONS,
  PAGINATION_OPTIONS,
  ORDER_STATUS_OPTIONS,
  FINANCIAL_STATUS_OPTIONS,
  FULFILLMENT_STATUS_OPTIONS,
} from "../constants/index";
import { useDebounce } from "@/composables/useDebounce";
import { useOrderStore } from "@/stores/order.store";
import { useAuthStore } from "@/stores/auth.store";
import DateSelect from "@/components/Select/DateSelect.vue";
import MultiSelect from "@/components/Select/MultiSelect.vue";
import BasePerPageOpt from "@/components/Table/PerPageOption/BasePerPageOpt.vue";

const orderStore = useOrderStore();
const filterForm = ref<FilterForm>({
  city: [],
  delivery_date: "",
  financial_status: "all",
  fulfillment_status: "all",
  order_status: "all",
});
const selectedRow = ref([]);

const getData = async () => {
  await orderStore.getOrderList({
    ...filterForm.value,
    ...orderStore.pagination,
  });
  orderStore.resetPage();
};

const onDateChange = async (date: string) => {
  filterForm.value.delivery_date = date;
  await getData();
};

const onDateReset = async () => {
  filterForm.value.delivery_date = "";
  await getData();
};

const onRowsPerPageChange = useDebounce(async (rowsPerPage: number) => {
  orderStore.pagination.rowsPerPage = rowsPerPage;
  await getData();
}, 600);

const onPaginationChange = async (page: number) => {
  orderStore.pagination.page = page;
  await orderStore.getOrderList({
    ...filterForm.value,
    ...orderStore.pagination,
  });
};

const onFilterChange = useDebounce(
  async <K extends FilterKey>(value: FilterForm[K], key: K) => {
    filterForm.value[key] = value;
    await getData();
  },
  600
);

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="filter">
    <DateSelect
      v-model="filterForm.delivery_date"
      label="配送日期"
      @update:model-value="onDateChange($event)"
      @reset-model-value="onDateReset"
    />

    <MultiSelect
      v-model="filterForm.city"
      label="配送縣市"
      :options="CITY_OPTIONS"
      @update-select="onFilterChange($event, 'city')"
    />

    <q-select
      v-model="filterForm.order_status"
      :options="ORDER_STATUS_OPTIONS"
      label="訂單狀態"
      outlined
      map-options
      emit-value
      @update:model-value="onFilterChange($event, 'order_status')"
    />

    <q-select
      v-model="filterForm.financial_status"
      :options="FINANCIAL_STATUS_OPTIONS"
      label="付款狀態"
      outlined
      map-options
      emit-value
      @update:model-value="onFilterChange($event, 'financial_status')"
    />

    <q-select
      v-model="filterForm.fulfillment_status"
      :options="FULFILLMENT_STATUS_OPTIONS"
      label="出貨狀態"
      outlined
      map-options
      emit-value
      @update:model-value="onFilterChange($event, 'fulfillment_status')"
    />
  </div>

  <div class="order-list-container">
    <q-table
      v-model:selected="selectedRow"
      :loading="orderStore.isLoading"
      :columns="ORDER_TABLE_COLUMNS"
      :rows="orderStore.order"
      :pagination="orderStore.pagination"
      row-key="id"
      selection="multiple"
      bordered
      flat
    >
      <template v-slot:loading>
        <q-inner-loading showing />
      </template>

      <template v-slot:top>
        <BasePerPageOpt
          v-model="orderStore.pagination.rowsPerPage"
          :options="PAGINATION_OPTIONS"
          :current-page="orderStore.pagination.page"
          :total-elements="orderStore.pagination.totalElements"
          @update:modelValue="onRowsPerPageChange"
        />
      </template>

      <template v-slot:bottom>
        <BasePerPageOpt
          v-model="orderStore.pagination.rowsPerPage"
          :options="PAGINATION_OPTIONS"
          :current-page="orderStore.pagination.page"
          :total-elements="orderStore.pagination.totalElements"
          @update:modelValue="onRowsPerPageChange"
        />
        <q-pagination
          class="pagination"
          v-model="orderStore.pagination.page"
          :max="orderStore.pagination.max"
          :max-pages="6"
          boundary-numbers
          color="grey-6"
          @update:model-value="onPaginationChange"
        />
      </template>
    </q-table>
  </div>

  <div class="other-container">
    <q-btn label="登出" outline @click="useAuthStore().logout" />
  </div>
</template>

<style lang="scss" scoped>
.filter {
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.5rem;
  column-gap: 1rem;

  & > * {
    flex: 1 1 100px;
  }
}

.order-list-container {
  padding: 2rem;
}

.date-picker-container {
  position: relative;

  .date-picker {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 1;
  }
}

.pagination {
  margin-left: auto;
}

.other-container {
  padding: 2rem;
  display: flex;
  justify-content: end;
}
</style>
