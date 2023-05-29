<script setup>
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const ActionsWrapper = defineAsyncComponent(() => import('@/components/ActionsWrapper.vue'))
const GoogleButton = defineAsyncComponent(() => import('./GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))

const signUpDialogVisibility = useSignUpDialogVisibility()
const { isSignUpDialogDisplayed } = storeToRefs(signUpDialogVisibility)

const loginDialogVisibility = useLoginDialogVisibility()

const switchToLoginDialog = () => {
  signUpDialogVisibility.toggleSignUpDialogVisibility()
  loginDialogVisibility.toggleLoginDialogVisibility()
}
</script>

<template>
  <BaseDialog
    :title="$t('signup.title')"
    :subtitle="$t('signup.subtitle')"
    :show="isSignUpDialogDisplayed"
    @close="signUpDialogVisibility.toggleSignUpDialogVisibility"
  >
    <template #default>
      <TextInput
        name="name"
        :label="$t('signup.form.name.label')"
        :placeholder="$t('signup.form.name.placeholder')"
      />
      <TextInput
        name="email"
        :label="$t('signup.form.email.label')"
        :placeholder="$t('signup.form.email.placeholder')"
      />
      <TextInput
        name="password"
        :label="$t('signup.form.password.label')"
        :placeholder="$t('signup.form.password.placeholder')"
      />
      <TextInput
        name="password_confirmed"
        :label="$t('signup.form.password_confirmed.label')"
        :placeholder="$t('signup.form.password_confirmed.placeholder')"
      />
      <ActionsWrapper>
        <ActionButton type="primary" submit>{{ $t('signup.actions.submit') }}</ActionButton>
        <GoogleButton>{{ $t('signup.actions.socialite_google') }}</GoogleButton>
      </ActionsWrapper>
    </template>
    <template #footer>
      <span>{{ $t('signup.footer.has_account') }}</span>
      <BaseLink to="/" @click="switchToLoginDialog">{{ $t('signup.footer.login') }}</BaseLink>
    </template>
  </BaseDialog>
</template>
