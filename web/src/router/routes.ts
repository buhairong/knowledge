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
    name: 'home'
  }
]
