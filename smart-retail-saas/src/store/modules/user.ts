import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const roles = ref<string[]>([]) 
  const username = ref('')

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearAuth = () => {
    token.value = ''
    roles.value = [] 
    username.value = ''
    localStorage.removeItem('token')
  }

  const getUserInfo = async () => {
    const res: any = await request.get('/user/info')
    roles.value = res.roles
    username.value = res.username
    return res.roles 
  }

  return { token, roles, username, setToken, clearAuth, getUserInfo }
})