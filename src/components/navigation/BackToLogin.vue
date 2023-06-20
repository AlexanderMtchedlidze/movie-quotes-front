<script setup>
import { useLoginDialogVisibility } from '@/stores/login'
import { defineAsyncComponent } from 'vue'
const BaseLink = defineAsyncComponent(() => import('../ui/BaseLink.vue'))

const loginDialogVisibility = useLoginDialogVisibility()
</script>

<template>
  <div class="flex justify-center gap-3">
    <img
      src="@/assets/icons/navigation/backward-navigation.svg"
      :alt="$t('alts.backward_navigation_arrow')"
    />
    <BaseLink
      to="/"
      @click="loginDialogVisibility.toggleLoginDialogVisibility"
      type="secondary"
      class="text-gray-slate"
      ><slot></slot
    ></BaseLink>
  </div>
</template>
