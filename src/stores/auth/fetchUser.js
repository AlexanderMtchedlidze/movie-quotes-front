import { ref } from 'vue'

import { getUser } from '../../config/axios/api/auth'

export const user = ref(null)

export const fetchUser = async () => {
  const { data } = await getUser()
  user.value = data
}
