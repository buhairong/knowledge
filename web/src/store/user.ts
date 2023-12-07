import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMenuStore } from './menu'

interface User {
  theme?: string
  token: string
  userId: number | null
  username: string
  nickname: string
}

export const useUserStore = defineStore(
  'users',
  () => {
    const userInfo = ref<User>({
      theme: '',
      token: '',
      userId: null,
      username: '',
      nickname: ''
    })

    const setUserInfo = (value: User) => {
      userInfo.value = value
    }

    const setThemeColor = (value: string) => {
      userInfo.value.theme = value
    }

    const logout = () => {
      userInfo.value.token = ''
      userInfo.value.userId = null
      userInfo.value.username = ''
      userInfo.value.nickname = ''
      const store = useMenuStore()
      store.setActiveMenuUrl('/home/index')
    }

    return {
      userInfo,
      setUserInfo,
      setThemeColor,
      logout
    }
  },
  {
    persist: true
  }
)
