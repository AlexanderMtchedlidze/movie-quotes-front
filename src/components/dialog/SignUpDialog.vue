<script setup>
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { useEmailVerificationDialogVisibility } from '@/stores/signup/emailVerificationDialogVisibility'
import { useAuthStore } from '@/stores/auth'

import { passwordRules, nameRules } from '@/config/vee-validate/utils/constants'

import { defineAsyncComponent, reactive } from 'vue'
import { Form } from 'vee-validate'

import { formClass } from '../utils/constants'

const ActionsWrapper = defineAsyncComponent(() => import('../wrapper/ActionsWrapper.vue'))
const EmailVerificationDialog = defineAsyncComponent(() => import('./EmailVerificationDialog.vue'))
const GoogleButton = defineAsyncComponent(() => import('../button/GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('../ui/BaseLink.vue'))

const signUpDialogVisibility = useSignUpDialogVisibility()
const loginDialogVisibility = useLoginDialogVisibility()
const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()

const form = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmed: null
})

const authStore = useAuthStore()

const onSubmit = async (values, { resetForm }) => {
  emailVerificationDialogVisibility.toggleVisibilityWhenUserRegistered()
  authStore.handleRegister(values)
  resetForm()
}
</script>

<template>
  <EmailVerificationDialog />
  <BaseDialog
    :title="$t('signup.title')"
    :subtitle="$t('signup.subtitle')"
    :show="signUpDialogVisibility.isSignUpDialogDisplayed"
    @close="signUpDialogVisibility.toggleSignUpDialogVisibility"
  >
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="name"
        :label="$t('signup.form.name.label')"
        :placeholder="$t('signup.form.name.placeholder')"
        v-model="form.name"
        :rules="nameRules"
      />
      <TextInput
        name="email"
        :label="$t('signup.form.email.label')"
        :placeholder="$t('signup.form.email.placeholder')"
        rules="required|email"
        v-model="form.email"
      />
      <TextInput
        name="password"
        :label="$t('signup.form.password.label')"
        :placeholder="$t('signup.form.password.placeholder')"
        v-model="form.password"
        :rules="passwordRules"
      />
      <TextInput
        name="password_confirmation"
        :label="$t('signup.form.password_confirmation.label')"
        :placeholder="$t('signup.form.password_confirmation.placeholder')"
        v-model="form.password_confirmed"
        rules="required|confirmed:@password"
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
