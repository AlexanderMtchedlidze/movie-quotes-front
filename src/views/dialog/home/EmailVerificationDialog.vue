<script setup>
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import { useEmailVerification } from '@/stores/emailVerification'
import { useLocalization } from '@/stores/localization'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const GmailOpener = defineAsyncComponent(() => import('@/components/navigation/GmailOpener.vue'))

const emailVerification = useEmailVerification()
</script>

<template>
  <BaseStatusDialog
    :title="$t('email_verification.title')"
    :img-alt="$t('alts.paper_plane_icon')"
    img-src="/paper-plane.svg"
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
</template>
