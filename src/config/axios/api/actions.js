import axiosInstance from '.'

export const getUser = () => axiosInstance.get('/user')
