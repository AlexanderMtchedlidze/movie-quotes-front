<script setup>
import { useSignUpDialogVisibility } from '@/stores/signup'
import { useForgotPassword } from '@/stores/forgotPassword'
import { useAuthStore } from '@/stores/auth'
import { useLocalization } from '@/stores/localization'

import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'

import { formClass } from '@/components/utils/constants'

const ActionsWrapper = defineAsyncComponent(() => import('@/components/wrapper/ActionsWrapper.vue'))
const GoogleButton = defineAsyncComponent(() => import('@/components/button/GoogleButton.vue'))
const CheckBoxInput = defineAsyncComponent(() => import('@/components/form/CheckBoxInput.vue'))

const forgotPasswordDialogVisibility = useForgotPassword()
const signUpDialogVisibility = useSignUpDialogVisibility()

const authStore = useAuthStore()

const onSubmit = async (values, actions) => {
  try {
    await authStore.handleLogin(values)
    actions.resetForm()
  } catch (e) {
    const usernameErrors = e.response.data.errors.username

    const localizationStore = useLocalization()
    const localizedError = localizationStore.locale === 'en' ? usernameErrors[0] : usernameErrors[1]

    actions.setErrors({
      username: localizedError
    })
  }
}
</script>

<template>
  <BaseDialog
    :title="$t('login.title')"
    :subtitle="$t('login.subtitle')"
  >
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="username"
        :label="$t('login.form.username.label')"
        :placeholder="$t('login.form.username.placeholder')"
        rules="required|min:3"
      />
      <TextInput
        name="password"
        :label="$t('login.form.password.label')"
        :placeholder="$t('login.form.password.placeholder')"
        type="password"
      />
      <div class="flex justify-between">
        <CheckBoxInput name="remember-me" :label="$t('login.actions.remember_me')" />
        <BaseLink
          to="/"
          @click="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
          >{{ $t('login.actions.forgot_password') }}</BaseLink
        >
      </div>
      <ActionsWrapper>
        <ActionButton type="primary" submit>{{ $t('login.actions.submit') }}</ActionButton>
        <GoogleButton>{{ $t('login.actions.socialite_google') }}</GoogleButton>
      </ActionsWrapper>
    </Form>
    <template #footer>
      <span>{{ $t('login.footer.dont_have_an_account') }}</span>
      <BaseLink to="/" @click="signUpDialogVisibility.toggleSignUpDialogVisibility">{{
        $t('login.footer.sign_up')
      }}</BaseLink>
    </template>
  </BaseDialog>
</template>
