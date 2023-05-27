<script setup>
import { useForgotPasswordDialogVisibility } from '@/stores/login/forgotPasswordDialogVisibility'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'vee-validate'

const BaseLink = defineAsyncComponent(() => import('./BaseLink.vue'))

const forgotPasswordDialogVisibility = useForgotPasswordDialogVisibility()
const { isForgotPasswordDialogVisible } = storeToRefs(forgotPasswordDialogVisibility)

const loginDialogVisibility = useLoginDialogVisibility()

const { t } = useI18n()

const formClass = computed(() => 'w-3/5 mx-auto flex justify-center flex-col gap-6 mt-6')

const onSubmit = async (values, { resetForm }) => {
  resetForm()
}
</script>

<template>
  <BaseDialog
    :title="t('forgot_password.title')"
    :show="isForgotPasswordDialogVisible"
    @close="forgotPasswordDialogVisibility.toggleForgotPasswordDialogVisibility"
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
  </BaseDialog>
</template>
