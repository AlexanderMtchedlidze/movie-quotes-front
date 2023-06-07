<script setup>
import { defineAsyncComponent } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

import {
  nameRules,
  passwordRules,
  passwordConfirmedRules
} from '@/config/vee-validate/utils/constants'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const userProfileImageSrc = useUserProfileImagePath(authStore.user.profile_image)

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const BackwardNavigation = defineAsyncComponent(() =>
  import('../components/navigation/BackwardNavigation.vue')
)
const ProfileInput = defineAsyncComponent(() => import('../components/form/ProfileInput.vue'))
const DashboardFileInput = defineAsyncComponent(() =>
  import('../components/form/DashboardFileInput.vue')
)
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 relative pb-0 md:pb-44">
      <header class="md:pb-32">
        <h4 class="font-medium pt-8 text-2xl hidden md:block ps-12">My profile</h4>
        <BackwardNavigation class="block md:hidden py-6 ps-9" />
      </header>
      <div
        class="px-8 md:px-24 lg:px-48 xl:px-48 text-center bg-midnight-creme-brulee md:bg-midnight-blue"
      >
        <header class="mb-10 pt-6">
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="w-48 h-48 mb-1 mx-auto rounded-full block md:hidden"
          />
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="hidden md:block absolute top-24 left-1/2 -translate-x-1/2"
          />
          <div class="pt-0 md:pt-[9.5rem]">
            <DashboardFileInput name="profile_image" v-model="profileStore.form.profileImage">
              <template #trigger>
                <label for="profile_image" class="text-xl hover:cursor-pointer"
                  >Upload new photo</label
                >
              </template>
            </DashboardFileInput>
            <input type="file" id="newPhoto" class="hidden" />
          </div>
        </header>
        <div class="flex flex-col gap-14 pb-40">
          <ProfileInput
            v-model="profileStore.username"
            label="Username"
            placeholder="name"
            @edit="profileStore.toggleNewUsernameInputVisibility"
          />
          <ProfileInput
            v-if="profileStore.newUsernameInputVisibility"
            v-model="profileStore.newUsername"
            clearable
            name="name"
            :rules="nameRules"
            label="New username"
            placeholder="New username"
          />

          <ProfileInput
            v-model="profileStore.email"
            label="Email"
            :value="authStore.user.email"
            placeholder="email"
            @edit="profileStore.toggleNewEmailInputVisibility"
          />
          <ProfileInput
            v-if="profileStore.newEmailInputVisibility"
            v-model="profileStore.newEmail"
            clearable
            name="email"
            rules="required|email"
            label="New email"
            placeholder="Enter new email"
          />

          <ProfileInput
            label="Password"
            :value="authStore.user.name"
            placeholder="Your current password"
            @edit="profileStore.toggleNewPasswordInputVisibility"
          />

          <div
            v-if="profileStore.newPasswordInputVisibility"
            class="flex flex-col gap-14 text-left"
          >
            <div class="rounded border border-input-disabled-border/20 p-6">
              <h4>Passwords should contain:</h4>
              <div class="mt-4 flex flex-col gap-1 justify-center text-sm tracking-wider">
                <div class="flex gap-1.5">
                  <img src="@/assets/icons/input/gray-eclipse.svg" alt="Gray eclipse" />
                  <span class="text-dark-gray">8 or more characters</span>
                </div>
                <div class="flex gap-1.5">
                  <img src="@/assets/icons/input/green-eclipse.svg" alt="Green eclipse" />
                  <span>15 lowercase character</span>
                </div>
              </div>
            </div>

            <ProfileInput
              v-model="profileStore.newPassword"
              clearable
              :rules="passwordRules"
              name="password"
              type="password"
              label="New password"
              placeholder="New password"
            />
            <ProfileInput
              v-model="profileStore.confirmNewPassword"
              clearable
              :rules="passwordConfirmedRules"
              name="password_confirmation"
              type="password"
              label="Confirm new password"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>
      <div class="hidden md:blcok">
        <div class="flex items-center justify-end gap-6 mt-16">
          <span class="hover:cursor-pointer text-gray-smoke">Cancel</span>
          <ActionButton v-if="profileStore.saveChangesButtonVisibility" type="primary"
            >Save Changes</ActionButton
          >
        </div>
      </div>
    </div>
  </DashBoardWrapper>
</template>
