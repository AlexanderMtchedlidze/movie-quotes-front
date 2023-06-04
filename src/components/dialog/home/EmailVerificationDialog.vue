<script setup>
import { defineAsyncComponent } from 'vue'
import { useEmailVerification } from '@/stores/emailVerification'

const GmailOpener = defineAsyncComponent(() => import('@/components/navigation/GmailOpener.vue'))

const emailVerification = useEmailVerification()
</script>

<template>
  <BaseDialog
    :title="$t('email_verification.title')"
    img-alt="Paper plane icon"
    img-src="/paper-plane.svg"
    :show="emailVerification.isDisplayedWhenUserRegistered"
    @close="emailVerification.toggleVisibilityWhenUserRegistered"
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
    :show="emailVerification.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerification.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton link href="#" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseDialog>
</template>
