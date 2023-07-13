<script setup>
import { ref, onMounted } from 'vue'
import { useToken } from '@/stores/token'
import { useRoute } from 'vue-router'

const tokenStore = useToken()

const topRef = ref(null)

const route = useRoute()

onMounted(() => {
  route.name === 'home' ? (topRef.value = '20') : (topRef.value = '24')
})
</script>

<template>
  <BaseStatusDialog
    :title="$t('token.link_expired')"
    :img-alt="$t('alts.icons_expired_icon')"
    img-src="/icons_expired.svg"
    :show="tokenStore.isPasswordExpiredDialogVisible"
    @close="tokenStore.togglePasswordExpiredDialogVisibility"
    top="20"
  >
    <p class="mt-8 mb-6">{{ $t('token.forgot_password_link_has_expired') }}</p>
    <ActionButton type="primary" @click="tokenStore.resendPasswordEmailVerification">{{
      $t('token.request_another_link')
    }}</ActionButton>
  </BaseStatusDialog>
</template>
