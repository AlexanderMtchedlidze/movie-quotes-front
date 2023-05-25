<script setup>
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'

import { defineAsyncComponent, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { Form } from 'vee-validate'

const ActionsWrapper = defineAsyncComponent(() => import('./ActionsWrapper.vue'))
const GoogleButton = defineAsyncComponent(() => import('./GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))
const CheckBoxInput = defineAsyncComponent(() => import('./CheckBoxInput.vue'))

const loginDialogVisibility = useLoginDialogVisibility()

const forgotPasswordDialogVisibility = useForgotPasswordDialogVisibility()

const signUpDialogVisibility = useSignUpDialogVisibility()

const { t } = useI18n()

const form = reactive({
  username: null,
  password: null
})

const authStore = useAuthStore()

const onSubmit = async (values, { resetForm }) => {
  await authStore.handleLogin(values)
  resetForm()
}

const formClass = computed(() => 'w-3/5 mx-auto flex justify-center flex-col gap-6 mt-6')
</script>

<template>
  <BaseDialog
    :title="t('login.title')"
    :subtitle="t('login.subtitle')"
    :show="loginDialogVisibility.isLoginDialogDisplayed"
    @close="loginDialogVisibility.toggleLoginDialogVisibility"
  >
    <Form @submit="onSubmit" :class="formClass">
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
      <ActionsWrapper>
        <ActionButton type="primary" submit>{{ t('login.actions.submit') }}</ActionButton>
        <GoogleButton>{{ t('login.actions.socialite_google') }}</GoogleButton>
      </ActionsWrapper>
    </Form>
    <template #footer>
      <span>{{ t('login.footer.dont_have_an_account') }}</span>
      <BaseLink to="/" @click="signUpDialogVisibility.toggleSignUpDialogVisibility">{{
        t('login.footer.sign_up')
      }}</BaseLink>
    </template>
  </BaseDialog>
</template>
