import type { Menu } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore(
  'menus',
  () => {
    const activeMenuUrl = ref('/home/index')
    const menus = ref<Partial<Menu>[]>([
      {
        id: 1,
        menuName: '用户管理',
        icon: 'Menu',
        route: '/home/users'
      },
      {
        id: 2,
        menuName: '角色管理',
        icon: 'Menu',
        route: '/home/roles'
      },
      {
        id: 3,
        menuName: '菜单管理',
        icon: 'Menu',
        route: '/home/menus'
      }
    ])

    const setActiveMenuUrl = (value: string) => {
      activeMenuUrl.value = value
    }

    return {
      activeMenuUrl,
      menus,
      setActiveMenuUrl
    }
  },
  {
    persist: true
  }
)
