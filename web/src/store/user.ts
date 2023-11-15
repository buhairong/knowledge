import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  token: string
  userId: number | null
  username: string
  nickname: string
}

export const useUserStore = defineStore('users', () => {
  const userInfo = ref<User>({
    token: '',
    userId: null,
    username: '',
    nickname: ''
  })
  
  const setUserInfo = (value: User) => {
    userInfo.value = value
  }

  const logout = () => {
    userInfo.value.token = ''
    userInfo.value.userId = null
    userInfo.value.username = ''
    userInfo.value.nickname = ''
  }
      
  return {
    userInfo,
    setUserInfo,
    logout
  }
},
{
  persist: true
}
)
