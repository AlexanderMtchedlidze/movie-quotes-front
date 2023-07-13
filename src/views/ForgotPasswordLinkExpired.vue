<script setup>
import { useToken } from '@/stores/token'

const tokenStore = useToken()
</script>

<template>
  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    @close="tokenStore.togglePasswordExpiredDialogVisibility"
    top="20"
  >
    <p class="mt-8 mb-6">{{ $t('token.forgot_password_link_has_expired') }}</p>
    <ActionButton type="primary" @click="tokenStore.resendPasswordEmailVerification">{{
      $t('token.request_another_link')
    }}</ActionButton>
  </BaseStatusDialog>
</template>
