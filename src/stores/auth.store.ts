import type { LoginForm } from "@/types/form.type"
import type { AuthData } from "@/types/auth.type"
import { defineStore } from "pinia"
import { ref } from "vue"
import { router } from "@/router/index"
import { postRequestWithoutAuth } from "@/utils/fetch.utils"
import { serviceEntries } from "@/services/index"
import { CommonUtils } from "@/utils/common.utils"
import { useToast } from "@/composables/useToast"

export const useAuthStore = defineStore("auth", () => {
  const isLoading = ref(false)

  const login = async (formData: LoginForm) => {
    isLoading.value = true
    try {
      const res = await postRequestWithoutAuth<AuthData>(serviceEntries.login, formData)
      setToken(res)
      router.push({ name: "Home" })
    } catch (error) {
      console.error("login error", error)
      const { errorToast } = useToast()
      errorToast("登入失敗，請檢查帳號或帳號密碼")
    }
    finally {
      isLoading.value = false
    }
  }

  const setToken = (authSate: AuthData) => {
    CommonUtils.setLocalStorage<string>("token", authSate.token)
  }

  const logout = () => {
    CommonUtils.removeLocalStorage("token")
    router.push({ name: "Login" })
  }

  return {
    isLoading,

    login,
    setToken,
    logout
  }
})