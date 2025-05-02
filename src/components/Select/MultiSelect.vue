<script setup lang="ts">
import { QBtnDropdown, QOptionGroup } from "quasar";

const props = defineProps<{
  label: string;
  options: { label: string; value: string }[];
}>();

const model = defineModel<string[]>("modelValue", {
  default: [],
});
const emit = defineEmits<{
  (e: "updateSelect", value: string[]): void;
}>();

const onChange = (value: string[]) => {
  emit("updateSelect", value);
};
</script>

<template>
  <div
    class="multi-select-container column justify-center items-left content-center"
  >
    <q-btn-dropdown :label="props.label" color="grey-5" outline>
      <q-option-group
        v-model="model"
        :options="props.options"
        color="primary"
        type="checkbox"
        @update:model-value="onChange($event)"
      />
    </q-btn-dropdown>
    <span class="hint">已選擇： {{ model.length }}</span>
  </div>
</template>

<style lang="scss" scoped>
.multi-select-container {
  position: relative;

  & > .q-btn {
    width: 100%;
    height: 100%;
    min-width: 80px;
  }

  .hint {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    color: #666;
  }
}
</style>
