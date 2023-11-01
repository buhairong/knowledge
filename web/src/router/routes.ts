import { RouteRecordRaw } from 'vue-router'
import Login from '@/views/LoginView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  }
]
