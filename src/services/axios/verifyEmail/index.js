import axios from '@/config/axios/api'

export const verifyEmail = (id, hash, email) => axios.get(`/email/verify/${id}/${hash}?email=${email}`)
