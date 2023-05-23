<script setup>
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const GoogleButton = defineAsyncComponent(() => import('./GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))
const CheckBoxInput = defineAsyncComponent(() => import('./CheckBoxInput.vue'))

const loginDialogVisibility = useLoginDialogVisibility()
const { isLoginDialogDisplayed } = storeToRefs(loginDialogVisibility)

const forgotPasswordDialogVisibility = useForgotPasswordDialogVisibility()

const signUpDialogVisibility = useSignUpDialogVisibility()

const switchToLoginDialog = () => {
  loginDialogVisibility.toggleLoginDialogVisibility()
  signUpDialogVisibility.toggleSignUpDialogVisibility()
}

const { t } = useI18n()
</script>

<template>
  <BaseDialog
    :title="t('login.title')"
    :subtitle="t('login.subtitle')"
    :show="isLoginDialogDisplayed"
    @close="loginDialogVisibility.toggleLoginDialogVisibility"
  >
    <template #default>
      <TextInput
        name="email"
        :label="t('login.form.email.label')"
        :placeholder="t('login.form.email.placeholder')"
      />
      <TextInput
        name="password"
        :label="t('login.form.password.label')"
        :placeholder="t('login.form.password.placeholder')"
      />
      <div class="flex justify-between">
        <CheckBoxInput name="remember-me" :label="t('login.actions.remember_me')" />
        <BaseLink
          to="/"
          @click="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
          >{{ t('login.actions.forgot_password') }}</BaseLink
        >
      </div>
    </template>
    <template #actions>
      <ActionButton type="primary" submit>{{ t('login.actions.submit') }}</ActionButton>
      <GoogleButton>{{ t('login.actions.socialite_google') }}</GoogleButton>
    </template>
    <template #footer>
      <span>{{ t('login.footer.dont_have_an_account') }}</span>
      <BaseLink to="/" @click="switchToLoginDialog">{{ t('login.footer.sign_up') }}</BaseLink>
    </template>
  </BaseDialog>
</template>
