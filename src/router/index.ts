import { type RouteLocationNormalized, type NavigationGuardNext, createRouter, createWebHistory } from 'vue-router'
import { CommonUtils } from '@/utils/common.utils'

import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '首頁-列表',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      title: '登入',
      requiresAuth: false
    }
  }
]

const checkLoginURL = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = CommonUtils.getLocalStorage<string>('token')

  if (to.name === 'Login' && token) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const checkRouteAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = CommonUtils.getLocalStorage<string>('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const createAppRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach(checkLoginURL)
  router.beforeEach(checkRouteAuth)

  return { router }
}

const { router } = createAppRouter()

export { router }
