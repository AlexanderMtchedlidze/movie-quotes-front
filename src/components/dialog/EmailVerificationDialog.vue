<script setup>
import { defineAsyncComponent } from 'vue'
import { useEmailVerificationDialogVisibility } from '@/stores/signup/emailVerificationDialogVisibility'

const GmailOpener = defineAsyncComponent(() => import('../navigation/GmailOpener.vue'))

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
    <GmailOpener>
      {{ $t('email_verification.notice.go_to_my_email') }}
    </GmailOpener>
  </BaseDialog>
  <BaseDialog
    :title="$t('email_verification.title')"
    img-alt="Success chechmark"
    img-src="/check-mark.svg"
    :show="emailVerificationDialogVisibility.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerificationDialogVisibility.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton link href="#" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseDialog>
</template>
