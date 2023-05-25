<script setup>
import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { defineAsyncComponent, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'
import { useAuthStore } from '../stores/auth'

const ActionsWrapper = defineAsyncComponent(() => import('@/components/ActionsWrapper.vue'))
const GoogleButton = defineAsyncComponent(() => import('./GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()

const switchToLoginDialog = () => {
  signUpDialogVisibility.toggleSignUpDialogVisibility()
  loginDialogVisibility.toggleLoginDialogVisibility()
}

const form = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmed: null
})

const { t } = useI18n()

const formClass = computed(() => 'w-3/5 mx-auto flex justify-center flex-col gap-6 mt-6')

const authStore = useAuthStore()

const onSubmit = async (values, { resetForm }) => {
  await authStore.handleRegister(values)
  resetForm()
}
</script>

<template>
  <BaseDialog
    :title="t('signup.title')"
    :subtitle="t('signup.subtitle')"
    :show="signUpDialogVisibility.isSignUpDialogDisplayed"
    @close="signUpDialogVisibility.toggleSignUpDialogVisibility"
  >
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="name"
        :label="t('signup.form.name.label')"
        :placeholder="t('signup.form.name.placeholder')"
        v-model="form.name"
      />
      <TextInput
        name="email"
        :label="t('signup.form.email.label')"
        :placeholder="t('signup.form.email.placeholder')"
        v-model="form.email"
      />
      <TextInput
        name="password"
        :label="t('signup.form.password.label')"
        :placeholder="t('signup.form.password.placeholder')"
        v-model="form.password"
      />
      <TextInput
        name="password_confirmation"
        :label="t('signup.form.password_confirmed.label')"
        :placeholder="t('signup.form.password_confirmed.placeholder')"
        v-model="form.password_confirmed"
      />
      <ActionsWrapper>
        <ActionButton type="primary" submit>{{ t('signup.actions.submit') }}</ActionButton>
        <GoogleButton>{{ t('signup.actions.socialite_google') }}</GoogleButton>
      </ActionsWrapper>
    </Form>
    <template #footer>
      <span>{{ t('signup.footer.has_account') }}</span>
      <BaseLink to="/" @click="switchToLoginDialog">{{ t('signup.footer.login') }}</BaseLink>
    </template>
  </BaseDialog>
</template>
