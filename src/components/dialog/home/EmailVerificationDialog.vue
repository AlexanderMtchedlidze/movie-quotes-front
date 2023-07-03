<script setup>
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { useEmailVerification } from '@/stores/emailVerification'
import { useLocalization } from '@/stores/localization'
import { useLoginDialogVisibility } from '@/stores/login'
import { useRoute } from 'vue-router'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const GmailOpener = defineAsyncComponent(() => import('@/components/navigation/GmailOpener.vue'))

const emailVerification = useEmailVerification()

const loginDialogVisibility = useLoginDialogVisibility()

const toggleLoginDialogShowing = () => {
  emailVerification.toggleVisibilityWhenUserVerifiedEmailSuccessfully()
  loginDialogVisibility.toggleLoginDialogVisibility()
}

const route = useRoute()
</script>

<template>
  <BaseStatusDialog
    :title="$t('email_verification.title')"
    :img-alt="$t('alts.paper_plane_icon')"
    img-src="/paper-plane.svg"
    :show="emailVerification.isDisplayedWhenUserRegistered"
    @close="emailVerification.toggleVisibilityWhenUserRegistered"
  >
    <p
      :class="mediumFontClass"
      class="mt-4 mb-10"
      v-html="$t('email_verification.notice.check_your_email')"
    ></p>
    <GmailOpener>
      {{ $t('email_verification.notice.go_to_my_email') }}
    </GmailOpener>
  </BaseStatusDialog>
  <BaseStatusDialog
    :title="$t('email_verification.title')"
    :img-alt="$t('alts.check_mark_icon')"
    img-src="/check-mark.svg"
    :show="emailVerification.isDisplayedWhenEmailVerificationWasSuccessful"
    @close="emailVerification.toggleVisibilityWhenUserVerifiedEmailSuccessfully"
  >
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton v-if="route.name === 'home'" @click="toggleLoginDialogShowing" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseStatusDialog>
</template>
