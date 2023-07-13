<script setup>
import { useToken } from '@/stores/token'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const tokenStore = useToken()

const topRef = ref(null)

const route = useRoute()

onMounted(async () => {
  route.name === 'home' ? (topRef.value = '20') : (topRef.value = '24')
})
</script>

<template>
  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    :show="tokenStore.isEmailExpiredDialogVisible"
    @close="tokenStore.toggleEmailExpiredDialogVisibility"
    top="20"
  >
    <p class="mt-8 mb-6">{{ $t('token.email_link_has_expired') }}</p>
    <ActionButton type="primary" @click="tokenStore.resendEmailVerification">{{
      $t('token.request_another_link')
    }}</ActionButton>
  </BaseStatusDialog>
</template>
