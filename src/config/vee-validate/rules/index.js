import { defineRule } from 'vee-validate'
import AllRules from '@vee-validate/rules'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

defineRule('lowRegistre', (value) => {
  const pattern = /^[a-z0-9]+$/
  if (!pattern.test(value)) {
    return false
  }
  return true
})
