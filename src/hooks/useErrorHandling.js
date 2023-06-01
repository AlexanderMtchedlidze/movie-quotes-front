export const useErrorHandling = (errors, actions) => {
  for (const error in errors) {
    actions.setErrors({
      [error]: errors[error].toString()
    })
  }
}
