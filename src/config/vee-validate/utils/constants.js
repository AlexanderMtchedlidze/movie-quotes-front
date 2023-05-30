import { computed } from 'vue'

export const nameRules = computed(() => ({
  required: true,
  lowRegistre: true,
  min: 3,
  max: 15
}))

export const passwordRules = computed(() => ({
  required: true,
  lowRegistre: true,
  min: 8,
  max: 15
}))
