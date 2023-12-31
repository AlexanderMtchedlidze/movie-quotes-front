import axios from 'axios'

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

export default axiosInstance
