<script setup>
import { useLoginDialogVisibility } from '@/stores/login'
import { defineAsyncComponent } from 'vue'
const BaseLink = defineAsyncComponent(() => import('../ui/BaseLink.vue'))

const loginDialogVisibility = useLoginDialogVisibility()
</script>

<template>
  <div class="flex justify-center gap-3">
    <img src="@/assets/icons/backward-navigation.svg" alt="Backward navigation arrow" />
    <BaseLink
      to="/"
      @click="loginDialogVisibility.toggleLoginDialogVisibility"
      type="secondary"
      class="text-gray-slate"
      ><slot></slot
    ></BaseLink>
  </div>
</template>
