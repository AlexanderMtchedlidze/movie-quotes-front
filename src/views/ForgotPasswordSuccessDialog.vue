<script setup>
import { defineAsyncComponent } from 'vue'

import { useForgotPassword } from '@/stores/forgotPassword'

const forgotPassword = useForgotPassword()

const GmailOpener = defineAsyncComponent(() => import('@/components/navigation/GmailOpener.vue'))
</script>

<template>
  <BaseStatusDialog
    :title="$t('forgot_password.notice.title')"
    :img-alt="$t('alts.paper_plane_icon')"
    img-src="/paper-plane.svg"
    @close="forgotPassword.toggleVisibilityWhenUserSentRecoveryRequest"
  >
    <p class="mt-8">{{ $t('forgot_password.notice.subtitle') }}</p>
    <GmailOpener class="mt-10">
      {{ $t('forgot_password.notice.actions.go_to_my_email') }}
    </GmailOpener>
    <BaseLink class="mt-8" to="/" type="secondary">{{
      $t('forgot_password.notice.actions.skip_confirm_later')
    }}</BaseLink>
  </BaseStatusDialog>
</template>
