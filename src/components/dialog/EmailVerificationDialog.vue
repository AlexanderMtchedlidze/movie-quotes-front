<script setup>
import { useEmailVerificationDialogVisibility } from '@/stores/signup/emailVerificationDialogVisibility'

const emailVerificationDialogVisibility = useEmailVerificationDialogVisibility()
</script>

<template>
  <BaseDialog
    :title="$t('email_verification.title')"
    img-alt="Paper plane icon"
    img-src="/paper-plane.svg"
    :show="emailVerificationDialogVisibility.isDisplayedWhenUserRegistered"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserRegistered"
  >
    <p class="mt-4 mb-10 font-medium" v-html="$t('email_verification.notice.check_your_email')"></p>
    <ActionButton link href="https://mail.google.com/mail/" target="_blank" type="primary">{{
      $t('email_verification.notice.go_to_my_email')
    }}</ActionButton>
  </BaseDialog>
  <BaseDialog
    :title="$t('email_verification.title')"
    :show="emailVerificationDialogVisibility.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <template #image>
      <img src="/check-mark.svg" alt="Check mark icon" class="w-12 h-12 mt-14 mb-10 mx-auto" />
    </template>
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton link href="#" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseDialog>
</template>
