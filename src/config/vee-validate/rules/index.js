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

defineRule('restrictGeorgianInput', (value) => {
  const georgianRegex = /^[ა-ჰ0-9\s.,\u2014_]*$/
  return georgianRegex.test(value)
})

defineRule('restrictEnglishInput', (value) => {
  const englishRegex = /^[a-zA-Z0-9\s.,\u2014_]*$/
  return englishRegex.test(value)
})