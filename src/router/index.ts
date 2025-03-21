// // `npm run deploy` For Github SPA
// import { createRouter, createWebHashHistory } from 'vue-router'
// const router = createRouter({
//   history: createWebHashHistory(), // 改為 Hash 模式
//   routes: [
//     { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
//     { path: '/docs', name: 'document', component: () => import('../views/DocsView.vue') },
//     { path: '/login', name: 'auth', component: () => import('@/views/LoginView.vue') },
//     { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') }
//   ]
// })
// export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DocsView from '../views/DocsView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/docs',
      name: 'document',
      component: DocsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'auth',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// ✅ 使用全域導航守衛進行 Token 驗證
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    alert('未授權，請先登入！')
    next('/login') // 沒有 Token，導向登入頁面
  } else {
    next() // 有 Token，允許進入
  }
})

export default router
