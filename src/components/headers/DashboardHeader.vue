<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="flex items-center justify-between py-4 px-16 bg-midnight-creme-brulee">
    <h3 class="uppercase font-medium text-creme-brulee">{{ $t('home.header.title') }}</h3>
    <div class="flex gap-9 items-center">
      <div class="relative hover:cursor-pointer">
        <img src="@/assets/icons/notification-bell.svg" alt="Notification bell" />
        <div
          class="absolute bottom-3 left-3 rounded-full bg-notification-red w-6 h-6 text-center text-white font-medium"
        >
          3
        </div>
      </div>
      <LangDropdown />
      <ActionButton type="outline" @click="authStore.handleLogout">{{
        $t('dashboard.header.actions.logout')
      }}</ActionButton>
    </div>
  </header>
</template>
