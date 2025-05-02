<script setup lang="ts">
import { QInput, QIcon } from "quasar";
import { defineProps, defineEmits, useAttrs } from "vue";

interface InputWithIconProps {
  modelValue: string;
  iconName?: string;
}

const props = defineProps<InputWithIconProps>();
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const updateValue = (value: string | number | null) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <q-input
    v-model="props.modelValue"
    v-bind="attrs"
    @update:model-value="updateValue"
  >
    <template v-if="props.iconName" v-slot:prepend>
      <q-icon :name="props.iconName" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped></style>
