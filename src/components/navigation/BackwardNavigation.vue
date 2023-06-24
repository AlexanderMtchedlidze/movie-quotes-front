<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router';
import { useProfileStore } from '@/stores/profile'

defineEmits(['closeEditDialogs'])

const router = useRouter()
const route = useRoute()

const goBack = () => {
  route.name === 'userProfile' ? handleClosingDialogs() : router.go(-1)
}

const profileStore = useProfileStore()

const handleClosingDialogs = () => {
  if (profileStore.profileImageDialogVisibility || profileStore.usernameDialogVisibility 
      || profileStore.emailDialogVisibility || profileStore.passwordsDialogVisibility) {
    profileStore.closeAllDialogs()
  } else {
    router.go(-1)
  }
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
