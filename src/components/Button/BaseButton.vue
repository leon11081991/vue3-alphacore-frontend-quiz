<script setup lang="ts">
import { QBtn, QSpinnerTail } from "quasar";
import { useAttrs, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    loadingColor?: string;
  }>(),
  {
    loadingColor: "white",
  }
);

const attrs = useAttrs();
</script>

<template>
  <q-btn v-bind="attrs">
    <template v-slot:loading>
      <q-spinner-tail :color="props.loadingColor" />
    </template>
  </q-btn>
</template>

<style lang="scss" scoped></style>
