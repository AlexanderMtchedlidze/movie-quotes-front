<script setup>
import { useI18n } from 'vue-i18n'
import { useEmailVerificationDialogVisibility } from '@/stores/signup/emailVerificationDialogVisibility'

const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()
const { t } = useI18n()
</script>

<template>
  <BaseDialog
    :title="t('email_verification_notice.title')"
    img-alt="Paper plane icon"
    img-src="/paper-plane.svg"
    :show="emailVerificationDialogVisibility.isDisplayedWhenUserRegistered"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserRegistered"
  >
    <p class="mb-10" v-html="t('email_verification_notice.check_your_email')"></p>
    <ActionButton type="primary" target="_blank" href="https://mail.google.com/mail/" link>{{
      t('email_verification_notice.go_to_my_email')
    }}</ActionButton>
  </BaseDialog>
</template>
