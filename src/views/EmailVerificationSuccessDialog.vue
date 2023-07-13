<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

const handleClosingSuccessDialog = () => {
  !authStore.user ? router.push({ name: 'home' }) : router.push({ name: 'newsFeed' })
}

const toggleLoginDialogShowing = () => {
  !authStore.user ? router.push({ name: 'login' }) : router.push({ name: 'newsFeed' })
}
</script>

<template>
  <BaseStatusDialog
    :title="$t('email_verification.title')"
    :img-alt="$t('alts.check_mark_icon')"
    img-src="/check-mark.svg"
    @close="handleClosingSuccessDialog"
  >
    <p class="mt-8 mb-8" v-html="$t('email_verification.verify.account_has_been_verified')"></p>
    <ActionButton @click="toggleLoginDialogShowing" type="primary">{{
      $t('email_verification.verify.go_to_my_news_feed')
    }}</ActionButton>
  </BaseStatusDialog>
</template>
