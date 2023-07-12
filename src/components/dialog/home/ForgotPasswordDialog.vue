<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'
import { useErrorHandling } from '@/hooks/useErrorHandling'

import { formClass } from '@/components/utils/constants'

const BackToLogin = defineAsyncComponent(() => import('@/components/navigation/BackToLogin.vue'))

const forgotPasswordStore = useForgotPassword()

const onSubmit = async (values, actions) => {
  try {
    await forgotPasswordStore.handleForgotPassword(values)
    forgotPasswordStore.toggleVisibilityWhenUserSentRecoveryRequest()
    actions.resetForm()
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}
</script>

<template>
  <BaseDialog :title="$t('forgot_password.title')">
    <template #subtitle>
      <h4 class="text-gray-slate mt-3" v-html="$t('forgot_password.subtitle')"></h4>
    </template>
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="email"
        :label="$t('forgot_password.form.email.label')"
        :placeholder="$t('forgot_password.form.email.placeholder')"
        rules="required|email"
      />
      <ActionButton type="primary" submit>{{ $t('forgot_password.actions.submit') }}</ActionButton>
    </Form>
    <BackToLogin class="mt-8">{{ $t('forgot_password.footer.back_to_login') }}</BackToLogin>
  </BaseDialog>
</template>
