<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <img
    src="@/assets/icons/navigation/white-back-arrow.svg"
    :alt="$t('alts.backward_navigation_arrow')"
    @click="goBack"
    class="hover:cursor-pointer"
  />
</template>
