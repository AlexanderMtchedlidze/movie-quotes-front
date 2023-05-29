<script setup>
import { useForgotPassword } from '@/stores/forgotPassword'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'
import { formClass } from './utils/constants'

const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))
const BackToLogin = defineAsyncComponent(() => import('./BackToLogin.vue'))

const forgotPasswordStore = useForgotPassword()
const loginDialogVisibility = useLoginDialogVisibility()

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
      <h4 class="text-gray-slate mt-3" v-html="t('forgot_password.subtitle')"></h4>
    </template>
    <Form @submit="onSubmit" :class="formClass">
      <TextInput
        name="email"
        :label="t('forgot_password.form.email.label')"
        :placeholder="t('forgot_password.form.email.placeholder')"
      />
      <ActionButton type="primary" submit>{{ t('forgot_password.actions.submit') }}</ActionButton>
      <div class="flex justify-center gap-3 mt-2">
        <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
        <BaseLink
          to="/"
          @click="loginDialogVisibility.toggleLoginDialogVisibility"
          type="secondary"
          class="text-gray-slate"
          >{{ t('forgot_password.footer.backward_navigation') }}</BaseLink
        >
      </div>
    </Form>
    <BackToLogin class="mt-2">{{ $t('forgot_password.footer.backward_navigation') }}</BackToLogin>
  </BaseDialog>
</template>
