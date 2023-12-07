import { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/LoginView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    name: 'home',
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'roles',
        component: () => import('@/views/roles/index.vue')
      },
      {
        path: 'menus',
        component: () => import('@/views/menus/index.vue')
      }
    ]
  }
]
