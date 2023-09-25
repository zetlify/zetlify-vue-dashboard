import axios from 'axios'
import useAuthStore from '@/stores/AuthStore'

// Axios Default API Config
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

// Middleware
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 419) {
      const authStore = useAuthStore()
      const { unsetAuth } = authStore()
      unsetAuth()
      location.replace('/timeout') // later with login button
    }

    return Promise.reject(error)
  }
)
