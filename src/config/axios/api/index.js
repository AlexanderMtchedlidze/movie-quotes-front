import axios from 'axios'

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json' // Replace with the desired content type
  },
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PATH
})

export default axiosInstance
