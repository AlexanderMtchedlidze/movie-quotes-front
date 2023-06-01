import { ref } from 'vue'

import { getUser } from '@/services/axios/auth'

export const user = ref(null)

export const fetchUser = async () => {
  const { data } = await getUser()
  user.value = data
}
