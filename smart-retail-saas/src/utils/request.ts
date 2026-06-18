import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', 
  timeout: 10000 
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, data, message } = response.data
    
    if (code === 200) {
      return data 
    } else {
      ElMessage.error(message || '系统异常')
      return Promise.reject(new Error(message || 'Error'))
    }
  },
  (error: AxiosError) => {
    let errMsg = '网络请求异常'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errMsg = 'Token已过期或未登录，请重新登录'
         
          break
        case 403:
          errMsg = '没有权限访问该接口'
          break
        case 404:
          errMsg = '请求的接口不存在'
          break
        case 500:
          errMsg = '服务器开小差了'
          break
        default:
          errMsg = error.message || '网络请求异常'
      }
    }
    ElMessage.error(errMsg)
    return Promise.reject(error)
  }
)

export default service