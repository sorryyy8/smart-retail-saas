import { createRouter, createWebHistory,type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export const constantRoutes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue') },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard', 
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      }
    ]
  }
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/goods',
    name: 'GoodsLayout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Goods',
        component: () => import('@/views/goods/index.vue'),
        meta: { roles: ['admin'] } 
      }
    ]
  },
  {
    path: '/order',
    name: 'OrderLayout',
    component: Layout,
    children: [
      { path: '', name: 'Order', component: () => import('@/views/order/index.vue'), meta: { roles: ['admin', 'editor'] } }
    ]
  },
  {
    path: '/settings',
    name: 'SettingsLayout',
    component: Layout,
    children: [
      { path: '', name: 'Settings', component: () => import('@/views/settings/index.vue'), meta: { roles: ['admin'] } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes 
})

export default router