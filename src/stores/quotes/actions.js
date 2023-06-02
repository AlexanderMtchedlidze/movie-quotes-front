import { ref } from 'vue'
import { getAllQuotes } from '@/services/axios/quotes'

export const allQuotes = ref(null)

export const handleGettingAllQuotes = async () => {
  const {
    data: { data }
  } = await getAllQuotes()
  allQuotes.value = data
}
