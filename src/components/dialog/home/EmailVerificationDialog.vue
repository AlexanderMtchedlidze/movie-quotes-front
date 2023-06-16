<script setup>
import { defineAsyncComponent } from 'vue'
import { useEmailVerification } from '@/stores/emailVerification'
import { computed } from 'vue'

const GmailOpener = defineAsyncComponent(() => import('@/components/navigation/GmailOpener.vue'))

const emailVerification = useEmailVerification()

const newsFeedLink = computed(() => ({ name: 'newsFeed' }))
</script>

<template>
  <BaseDialog
    :title="$t('email_verification.title')"
    :img-alt="$t('alts.paper_plane_icon')"
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
    :img-alt="$t('alts.check_mark_icon')"
    img-src="/check-mark.svg"
    :show="emailVerification.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerification.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton link :href="newsFeedLink" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseDialog>
</template>
