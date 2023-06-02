import { ref } from 'vue'

import { getUser } from '@/services/axios/auth'

export const user = ref(null)

export const fetchUser = async () => {
  try {
    const { data } = await getUser()
    user.value = data
  } catch (e) {
    console.log('Error during getting authorized user')
  }
}
