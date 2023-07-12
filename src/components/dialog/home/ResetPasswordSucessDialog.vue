<script setup>
import { useLoginDialogVisibility } from '@/stores/login'

const loginPasswordStore = useLoginDialogVisibility()
</script>

<template>
  <BaseStatusDialog
    :title="$t('reset_password.success.title')"
    :img-alt="$t('alts.check_mark_icon')"
    img-src="/check-mark.svg"
  >
    <p class="mt-8" v-html="$t('reset_password.success.subtitle')"></p>
    <ActionButton
      @click="loginPasswordStore.toggleLoginDialogVisibility"
      type="primary"
      class="mt-8"
      >{{ $t('reset_password.success.actions.log_in') }}</ActionButton
    >
  </BaseStatusDialog>
</template>
