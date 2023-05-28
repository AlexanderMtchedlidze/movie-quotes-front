<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { useResetPassword } from '@/stores/resetPassword'
import { Form } from 'vee-validate'
import { formClass } from './utils/constants'

const forgotPasswordStore = useForgotPassword()
const resetPasswordStore = useResetPassword()

const initialValues = {
    email: forgotPasswordStore.userEmail,
    token: forgotPasswordStore.token
}

const onSubmit = async (values, { resetForm }) => {
  await resetPasswordStore.handleResetPassword(values)
  resetPasswordStore.toggleResetPasswordSuccessDialogVisibility()
  resetForm()
}
</script>

<template>
  <BaseDialog
    :title="$t('forgot_password.title')"
    :show="resetPasswordStore.isResetPasswordDialogVisible"
    @close="resetPasswordStore.toggleResetPasswordDialogVisibility"
  >
    <template #subtitle>
      <h4 class="text-gray-slate" v-html="$t('forgot_password.subtitle')"></h4>
    </template>
    <Form :class="formClass" @submit="onSubmit" :initial-values="initialValues">
      <TextInput
        name="password"
        :label="$t('reset_password.form.password.label')"
        :placeholder="$t('forgot_password.form.password.placeholder')"
      />
      <TextInput
        name="password_confirmation"
        :label="$t('reset_password.form.password_confirmation.label')"
        :placeholder="$t('forgot_password.form.password_confirmation.placeholder')"
      />
      <TextInput class="hidden" name="token" />
      <TextInput class="hidden" name="email" />
      <ActionButton type="primary" submit>{{ $t('forgot_password.actions.submit') }}</ActionButton>
    </Form>
    <div class="flex justify-center gap-3 mt-2">
      <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
    </div>
  </BaseDialog>
  <BaseDialog
    :title="$t('forgot_password.notice.title')"
    :show="resetPasswordStore.isResetPasswordSuccessDialogVisible"
    @close="resetPasswordStore.toggleResetPasswordSuccessDialogVisibility"
  >
    <template #subtitle>
      <h4 class="text-gray-slate" v-html="$t('forgot_password.notice.subtitle')" />
    </template>
    <div class="flex justify-center gap-3 mt-2">
      <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
    </div>
  </BaseDialog>
</template>
