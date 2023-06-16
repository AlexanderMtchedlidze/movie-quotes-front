<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { useResetPassword } from '@/stores/resetPassword'
import { useLoginDialogVisibility } from '@/stores/login'
import { Form } from 'vee-validate'
import { formClass } from '@/components/utils/constants'
import { defineAsyncComponent } from 'vue'

import { passwordRules, passwordConfirmedRules } from '@/config/vee-validate/utils/constants'

const forgotPasswordStore = useForgotPassword()
const resetPasswordStore = useResetPassword()
const loginPasswordStore = useLoginDialogVisibility()

const BackToLogin = defineAsyncComponent(() => import('@/components/navigation/BackToLogin.vue'))

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
    :title="$t('reset_password.title')"
    :show="resetPasswordStore.isResetPasswordDialogVisible"
    @close="resetPasswordStore.toggleResetPasswordDialogVisibility"
  >
    <template #subtitle>
      <h4 class="text-gray-slate mt-3" v-html="$t('reset_password.subtitle')"></h4>
    </template>
    <Form :class="formClass" @submit="onSubmit" :initial-values="initialValues">
      <TextInput
        name="password"
        :label="$t('signup.form.password.label')"
        :placeholder="$t('signup.form.password.placeholder')"
        type="password"
        :rules="passwordRules"
      />
      <TextInput
        name="password_confirmation"
        :label="$t('signup.form.password_confirmation.label')"
        :placeholder="$t('signup.form.password_confirmation.placeholder')"
        type="password"
        :rules="passwordConfirmedRules"
      />
      <TextInput class="hidden" name="token" />
      <TextInput class="hidden" name="email" />
      <ActionButton type="primary" submit>{{ $t('reset_password.submit') }}</ActionButton>
      <BackToLogin class="mt-8">{{ $t('forgot_password.footer.back_to_login') }}</BackToLogin>
    </Form>
  </BaseDialog>
  <BaseDialog
    :title="$t('reset_password.success.title')"
    :img-alt="$t('alts.check_mark_icon')"
    img-src="/check-mark.svg"
    :show="resetPasswordStore.isResetPasswordSuccessDialogVisible"
    @close="resetPasswordStore.toggleResetPasswordSuccessDialogVisibility"
  >
    <p class="mt-8" v-html="$t('reset_password.success.subtitle')"></p>
    <ActionButton
      @click="loginPasswordStore.toggleLoginDialogVisibility"
      type="primary"
      class="mt-8"
      >{{ $t('reset_password.success.actions.log_in') }}</ActionButton
    >
  </BaseDialog>
</template>
