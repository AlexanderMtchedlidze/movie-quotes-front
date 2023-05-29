<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'

import { formClass } from '../utils/constants'

const BackToLogin = defineAsyncComponent(() => import('../navigation/BackToLogin.vue'))

const forgotPasswordStore = useForgotPassword()

const onSubmit = async (values, { resetForm }) => {
  forgotPasswordStore.toggleVisibilityWhenUserSentRecoveryRequest()
  await forgotPasswordStore.handleForgotPassword(values)
  resetForm()
}
</script>

<template>
  <BaseDialog
    :title="$t('forgot_password.title')"
    :show="forgotPasswordStore.isForgotPasswordDialogVisible"
    @close="forgotPasswordStore.toggleForgotPasswordDialogVisibility"
  >
    <template #subtitle>
      <h4 class="text-gray-slate mt-3" v-html="$t('forgot_password.subtitle')"></h4>
    </template>
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="email"
        :label="$t('forgot_password.form.email.label')"
        :placeholder="$t('forgot_password.form.email.placeholder')"
      />
      <ActionButton type="primary" submit>{{ $t('forgot_password.actions.submit') }}</ActionButton>
    </Form>
    <BackToLogin class="mt-8">{{ $t('forgot_password.footer.backward_navigation') }}</BackToLogin>
  </BaseDialog>
</template>
