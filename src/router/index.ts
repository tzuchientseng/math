// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import DocsView from '../views/DocsView.vue'
// import LoginView from '@/views/LoginView.vue'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/docs',
//       name: 'document',
//       component: DocsView,
//     },
//     {
//       path: '/login',
//       name: 'auth',
//       component: LoginView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // 改為 Hash 模式
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/docs', name: 'document', component: () => import('../views/DocsView.vue') },
    { path: '/login', name: 'auth', component: () => import('@/views/LoginView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') }
  ]
})

export default router
