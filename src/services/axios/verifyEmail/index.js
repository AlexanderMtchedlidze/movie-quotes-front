import axios from '@/config/axios/api'

export const verifyEmail = (id, hash, email) =>
  axios.get(`/email/verify/${id}/${hash}?email=${email}`)

export const sendEmailVerification = (email) => axios.post(`/get-email-verification/${email}`)
