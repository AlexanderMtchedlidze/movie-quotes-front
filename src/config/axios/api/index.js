import axios from 'axios'

// import router from '@/router'

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_PATH
})

// axiosInstance.interceptors.response.use(
//   () => {},
//   (error) => {
//     const route = router.currentRoute.value
//     if (route.meta.auth && error.response.status === 401) {
//       router.replace('/')
//     }
//   }
// )

export default axiosInstance
