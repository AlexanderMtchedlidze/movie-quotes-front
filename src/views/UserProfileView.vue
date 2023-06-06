<script setup>
import { defineAsyncComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const authStore = useAuthStore()

const userProfileImageSrc = useUserProfileImagePath(authStore.user.profile_image)

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const ProfileInput = defineAsyncComponent(() => import('../components/form/ProfileInput.vue'))
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 relative">
      <header class="ps-12 pb-32">
        <h4 class="font-medium text-2xl">My profile</h4>
      </header>
      <div class="px-48 text-center bg-midnight-blue">
        <header class="mb-10">
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="w-48 h-48 rounded-full absolute top-16 left-1/2 -translate-x-1/2"
          />
          <p class="text-xl pt-32">Upload new photo</p>
        </header>
        <div class="flex flex-col gap-14 pb-40">
          <ProfileInput label="Username" :value="authStore.user.name" placeholder="name" />
          <ProfileInput label="Email" :value="authStore.user.email" placeholder="email" />
          <ProfileInput label="Password" :value="authStore.user.name" placeholder="password" />
        </div>
      </div>
    </div>
  </DashBoardWrapper>
</template>
