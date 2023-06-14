import { useLocalization } from '@/stores/localization'

const localizationStore = useLocalization()

export const useErrorHandling = (errors, actions) => {
  for (const error in errors) {
    actions.setErrors({
      [error]: errors[error][0][localizationStore.locale].toString()
    })
  }
}
