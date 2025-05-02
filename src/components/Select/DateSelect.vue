<script setup lang="ts">
import {
  type QPopupProxyInnerComponent,
  QInput,
  QIcon,
  QPopupProxy,
  QDate,
  QBtn,
} from "quasar";
import { ref } from "vue";

const props = defineProps<{
  label: string;
}>();

const model = defineModel("modelValue", {
  default: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "resetModelValue"): void;
}>();

const popupRef = ref<QPopupProxyInnerComponent | null>(null);

const handleClosePopup = () => {
  if (!popupRef.value) return;
  popupRef.value.hide();
};

const onDateChange = (date: string) => {
  emit("update:modelValue", date);
  handleClosePopup();
};

const onDateReset = () => {
  handleClosePopup();
  emit("resetModelValue");
};
</script>

<template>
  <q-input v-model="model" :label="props.label" outlined mask="date">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="popupRef"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="model"
            minimal
            @update:model-value="onDateChange($event)"
          >
            <q-btn
              class="q-mt-sm"
              label="清空日期"
              outline
              @click="onDateReset"
            />
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style lang="scss" scoped></style>
