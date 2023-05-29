<script setup>
import { useI18n } from 'vue-i18n'
import { useEmailVerificationDialogVisibility } from '@/stores/signup/emailVerificationDialogVisibility'

const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()
const { t } = useI18n()
</script>

<template>
  <BaseDialog
    :title="t('email_verification.title')"
    img-alt="Paper plane icon"
    img-src="/paper-plane.svg"
    :show="emailVerificationDialogVisibility.isDisplayedWhenUserRegistered"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserRegistered"
  >
    <p class="mb-10" v-html="t('email_verification.notice.check_your_email')"></p>
    <ActionButton type="primary" target="_blank" href="https://mail.google.com/mail/" link>{{
      t('email_verification.notice.go_to_my_email')
    }}</ActionButton>
  </BaseDialog>
  <BaseDialog
    :title="t('email_verification.title')"
    :show="emailVerificationDialogVisibility.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <template #image>
      <img src="/check-mark.svg" alt="Check mark icon" class="w-12 h-12 mt-14 mb-10 mx-auto" />
    </template>
    <p class="mt-8 mb-8" v-html="t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton type="primary" href="#" link>{{
      t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseDialog>
</template>
