<script setup lang="ts">
import { ref } from "vue";
import { QForm } from "quasar";
import { loginFormRules } from "@/utils/rules.utils";
import { useAuthStore } from "@/stores/auth.store";
import InputWithIcon from "@/components/Input/InputWithIcon.vue";
import BaseButton from "@/components/Button/BaseButton.vue";

const authStore = useAuthStore();
const formRules = loginFormRules();

const userForm = ref({
  username: "",
  password: "",
});

const handleReset = () => {
  userForm.value = {
    username: "",
    password: "",
  };
};

const onLoginSubmit = async () => {
  await authStore.login(userForm.value);
  handleReset();
};
</script>

<template>
  <div class="login-page">
    <q-form @submit="onLoginSubmit">
      <InputWithIcon
        v-model="userForm.username"
        label="帳號"
        lazy-rules
        :rules="formRules.username"
        iconName="person"
      />

      <InputWithIcon
        v-model="userForm.password"
        label="密碼"
        type="password"
        lazy-rules
        :rules="formRules.password"
        iconName="lock"
      />

      <div class="q-mt-md row wrap justify-between content-center">
        <BaseButton
          label="登入"
          type="submit"
          color="primary"
          :loading="authStore.isLoading"
        />
        <BaseButton
          label="重置"
          outline
          color="secondary"
          @click="handleReset"
        />
      </div>
    </q-form>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  min-height: 500px;
  background-color: #f0f0f0;
}
</style>
