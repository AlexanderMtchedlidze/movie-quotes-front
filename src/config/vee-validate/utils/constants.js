import { computed } from 'vue'

export const nameRules = computed(() => ({
  required: true,
  lowRegistre: true,
  min: 3,
  max: 15
}))

export const nonRequiredNameRules = computed(() => ({
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

export const nonRequiredPasswordRules = computed(() => ({
  min: 8,
  max: 15
}))

export const passwordConfirmedRules = computed(() => ({
  required: true,
  confirmed: '@password'
}))

export const nonRequiredPasswordConfirmedRules = computed(() => ({
  confirmed: '@password'
}))
