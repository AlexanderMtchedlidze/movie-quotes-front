import axios from '@/config/axios/api'

export const verifyEmail = (id, hash) => axios.get(`/email/verify/${id}/${hash}`)
