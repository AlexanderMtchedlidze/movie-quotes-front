<script setup>
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))


const forgotPasswordDialogVisibility = useForgotPasswordDialogVisibility()
const { isForgotPasswordDialogVisible } = storeToRefs(forgotPasswordDialogVisibility)

const loginDialogVisibility = useLoginDialogVisibility()

const { t } = useI18n()
</script>

<template>
  <BaseDialog
    :title="t('forgot_password.title')"
    :subtitle="t('forgot_password.subtitle')"
    :show="isForgotPasswordDialogVisible"
    @close="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
  >
    <template #default>
      <TextInput
        name="email"
        :label="t('forgot_password.form.email.label')"
        :placeholder="t('forgot_password.form.email.placeholder')"
      />
    </template>
    <template #actions>
      <ActionButton type="primary" submit>{{ t('forgot_password.actions.submit') }}</ActionButton>
      <div class="flex justify-center gap-3 mt-10">
        <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
        <BaseLink
          to="/"
          @click="loginDialogVisibility.toggleLoginDialogVisibility"
          type="secondary"
          >{{ t('forgot_password.footer.backward_navigation') }}</BaseLink
        >
      </div>
    </template>
  </BaseDialog>
</template>
