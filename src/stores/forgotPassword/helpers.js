import { useForgotPassword } from '.'

export const extractForgotPasswordCookie = () => {
  const store = useForgotPassword()
  const token = Cookies.get('forgot_password_token')

  store.forgotPasswordToken = token
}

export const getExpiredDate = () => {
  const expirationDate = new Date()
  return expirationDate.setDate(expirationDate.getDate() + 7)
}
