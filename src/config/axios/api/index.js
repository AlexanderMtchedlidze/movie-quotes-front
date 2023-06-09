import axios from 'axios'

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  // header
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PATH
})

export default axiosInstance
