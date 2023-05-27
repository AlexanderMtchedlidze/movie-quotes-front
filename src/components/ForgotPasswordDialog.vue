<script setup>
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { useForgotPassword } from '@/stores/forgotPassword'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { Form } from 'vee-validate'
import { formClass } from './utils/constants'

const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))

const forgotPasswordDialogVisibility = useForgotPasswordDialogVisibility()
const { isForgotPasswordDialogVisible } = storeToRefs(forgotPasswordDialogVisibility)

const loginDialogVisibility = useLoginDialogVisibility()

const forgotPasswordStore = useForgotPassword()

const onSubmit = async (values, { resetForm }) => {
  await forgotPasswordStore.handleForgotPassword(values)
  forgotPasswordDialogVisibility.toggleNoticeDialogVisibility
  resetForm()
}
</script>

<template>
  <BaseDialog
    :title="$t('forgot_password.title')"
    :show="isForgotPasswordDialogVisible"
    @close="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
  >
    <template #subtitle>
      <h4 class="text-gray-slate" v-html="$t('forgot_password.subtitle')" />
    </template>
    <Form :class="formClass" @submit="onSubmit">
      <TextInput
        name="email"
        :label="$t('forgot_password.form.email.label')"
        :placeholder="$t('forgot_password.form.email.placeholder')"
      />
      <ActionButton type="primary" submit>{{ $t('forgot_password.actions.submit') }}</ActionButton>
    </Form>

    <div class="flex justify-center gap-3 mt-2">
      <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
      <BaseLink
        to="/"
        @click="loginDialogVisibility.toggleLoginDialogVisibility"
        type="secondary"
        class="text-gray-slate"
        >{{ $t('forgot_password.footer.backward_navigation') }}</BaseLink
      >
    </div>
  </BaseDialog>
</template>
