<script setup>
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from "vee-validate"
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

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

const form = reactive({
  username: null,
  password: null
})

const authStore = useAuthStore()

const handleSubmit = async (values) => {
  await authStore.handleLogin(values)
}

console.log(authStore.user) 
</script>

<template>
  <BaseDialog
    :title="t('login.title')"
    :subtitle="t('login.subtitle')"
    :show="isLoginDialogDisplayed"
    @close="loginDialogVisibility.toggleLoginDialogVisibility"
  >
    <template #default>
      <Form @submit="handleSubmit">
        <TextInput
          name="username"
          :label="t('login.form.username.label')"
          :placeholder="t('login.form.username.placeholder')"
          v-model="form.username"
        />
        <TextInput
          name="password"
          :label="t('login.form.password.label')"
          :placeholder="t('login.form.password.placeholder')"
          v-model="form.password"
        />
        <div class="flex justify-between">
          <CheckBoxInput name="remember-me" :label="t('login.actions.remember_me')" />
          <BaseLink
            to="/"
            @click="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
            >{{ t('login.actions.forgot_password') }}</BaseLink
          >
        </div>
        <ActionButton type="primary" submit>{{ t('login.actions.submit') }}</ActionButton>
        <GoogleButton>{{ t('login.actions.socialite_google') }}</GoogleButton>
      </Form>
    </template>
    <template #footer>
      <span>{{ t('login.footer.dont_have_an_account') }}</span>
      <BaseLink to="/" @click="switchToLoginDialog">{{ t('login.footer.sign_up') }}</BaseLink>
    </template>
  </BaseDialog>
</template>
