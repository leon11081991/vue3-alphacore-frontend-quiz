<script setup lang="ts">
import { QSelect } from "quasar";
import { defineProps, computed } from "vue";

interface PaginationRowProps {
  options: Array<{ label: string; value: number }>;
  currentPage: number;
  totalElements: number;
}

const props = defineProps<PaginationRowProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
const rowsPerPage = defineModel<number>("rowsPerPage", {
  default: 20,
});

const offset = computed(() => {
  return (props.currentPage - 1) * rowsPerPage.value;
});

const endItem = computed(() => {
  return Math.min(offset.value + rowsPerPage.value, props.totalElements);
});
</script>

<template>
  <div class="">
    <q-select
      class="rows-per-page-select"
      v-model="rowsPerPage"
      :options="props.options"
      label="每頁顯示筆數"
      borderless
      map-options
      emit-value
      @update:modelValue="emit('update:modelValue', rowsPerPage)"
    />
    <p>{{ props.totalElements }}筆中的第{{ offset + 1 }} - {{ endItem }}筆</p>
  </div>
</template>

<style lang="scss" scoped>
.rows-per-page-select {
  min-width: 120px;
}
</style>
