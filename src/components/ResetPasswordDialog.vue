<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { useResetPassword } from '@/stores/resetPassword'
import { Form } from 'vee-validate'
import { formClass } from './utils/constants'
import { defineAsyncComponent } from 'vue'

const forgotPasswordStore = useForgotPassword()
const resetPasswordStore = useResetPassword()

const BackToLogin = defineAsyncComponent(() => import('./BackToLogin.vue'))

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
      <h4 class="text-gray-slate" v-html="$t('reset_password.subtitle')"></h4>
    </template>
    <Form :class="formClass" @submit="onSubmit" :initial-values="initialValues">
      <TextInput
        name="password"
        :label="$t('signup.form.password.label')"
        :placeholder="$t('signup.form.password.placeholder')"
      />
      <TextInput
        name="password_confirmation"
        :label="$t('signup.form.password_confirmation.label')"
        :placeholder="$t('signup.form.password_confirmation.placeholder')"
      />
      <TextInput class="hidden" name="token" />
      <TextInput class="hidden" name="email" />
      <ActionButton type="primary" submit>{{ $t('reset_password.submit') }}</ActionButton>
      <BackToLogin class="mt-10">{{
        $t('forgot_password.footer.backward_navigation')
      }}</BackToLogin>
    </Form>
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
