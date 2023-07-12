<script setup>
import { useLoginDialogVisibility } from '@/stores/login'
import { useEmailVerification } from '@/stores/emailVerification'
import { useAuthStore } from '@/stores/auth'
import { useErrorHandling } from '@/hooks/useErrorHandling'

import {
  nameRules,
  passwordRules,
  passwordConfirmedRules
} from '@/config/vee-validate/utils/constants'

import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'

import { formClass } from '@/components/utils/constants'

const ActionsWrapper = defineAsyncComponent(() => import('@/components/wrapper/ActionsWrapper.vue'))
const EmailVerificationDialog = defineAsyncComponent(() => import('./EmailVerificationDialog.vue'))
const GoogleButton = defineAsyncComponent(() => import('@/components/button/GoogleButton.vue'))

const loginDialogVisibility = useLoginDialogVisibility()
const emailVerification = useEmailVerification()

const authStore = useAuthStore()

const onSubmit = async (values, actions) => {
  try {
    await authStore.handleRegister(values)
    emailVerification.toggleVisibilityWhenUserRegistered()
    actions.resetForm()
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}
</script>

<template>
  <EmailVerificationDialog />
  <BaseDialog :title="$t('signup.title')" :subtitle="$t('signup.subtitle')">
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="name"
        :label="$t('signup.form.name.label')"
        :placeholder="$t('signup.form.name.placeholder')"
        :rules="nameRules"
      />
      <TextInput
        name="email"
        :label="$t('signup.form.email.label')"
        :placeholder="$t('signup.form.email.placeholder')"
        rules="required|email"
      />
      <TextInput
        name="password"
        type="password"
        :label="$t('signup.form.password.label')"
        :placeholder="$t('signup.form.password.placeholder')"
        :rules="passwordRules"
      />
      <TextInput
        name="password_confirmation"
        type="password"
        :label="$t('signup.form.password_confirmation.label')"
        :placeholder="$t('signup.form.password_confirmation.placeholder')"
        :rules="passwordConfirmedRules"
      />
      <ActionsWrapper>
        <ActionButton type="primary" submit>{{ $t('signup.actions.submit') }}</ActionButton>
        <GoogleButton>{{ $t('signup.actions.socialite_google') }}</GoogleButton>
      </ActionsWrapper>
    </Form>
    <template #footer>
      <span>{{ $t('signup.footer.has_account') }}</span>
      <BaseLink to="/" @click="loginDialogVisibility.toggleLoginDialogVisibility">{{
        $t('signup.footer.login')
      }}</BaseLink>
    </template>
  </BaseDialog>
</template>
