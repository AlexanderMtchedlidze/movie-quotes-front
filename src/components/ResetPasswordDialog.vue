<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { useResetPassword } from '@/stores/resetPassword'
import { Form } from 'vee-validate'
import { formClass } from './utils/constants'

const forgotPasswordStore = useForgotPassword()
const resetPasswordStore = useResetPassword()

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
    <Form :class="formClass" @submit="onSubmit">
      <TextInput
        name="email"
        :label="$t('forgot_password.form.email.label')"
        :placeholder="$t('forgot_password.form.email.placeholder')"
      />
      <TextInput name="token" hidden :value="forgotPasswordStore.forgotPasswordToken" />
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
