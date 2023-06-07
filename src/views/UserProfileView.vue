<script setup>
import { ref, computed, defineAsyncComponent, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'

const authStore = useAuthStore()

const userProfileImageSrc = useUserProfileImagePath(authStore.user.profile_image)

const form = reactive({
  profile_image: null
})

const username = ref(authStore.user.name)
const newUsername = ref('')

const newUsernameInputVisibility = ref(false)

const toggleNewUsernameInputVisibility = () => {
  newUsernameInputVisibility.value = !newUsernameInputVisibility.value
}

const email = ref(authStore.user.email)
const newEmail = ref('')

const newEmailInputVisibility = ref(false)

const toggleNewEmailInputVisibility = () => {
  newEmailInputVisibility.value = !newEmailInputVisibility.value
}

const newPassword = ref('')
const confirmNewPassword = ref('')

const newPasswordInputVisibility = ref(false)

const toggleNewPasswordInputVisibility = () => {
  newPasswordInputVisibility.value = !newPasswordInputVisibility.value
}

const saveChangesButtonVisibility = computed(() => newUsername.value || newEmail.value)

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const ProfileInput = defineAsyncComponent(() => import('../components/form/ProfileInput.vue'))
const DashboardFileInput = defineAsyncComponent(() =>
  import('../components/form/DashboardFileInput.vue')
)
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 relative pb-44">
      <header class="ps-12 pb-32">
        <h4 class="font-medium text-2xl">My profile</h4>
      </header>
      <div class="px-16 md:px-24 lg:px-48 xl:px-48 text-center bg-midnight-blue">
        <header class="mb-10">
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="w-48 h-48 rounded-full absolute top-16 left-1/2 -translate-x-1/2"
          />
          <div class="pt-32">
            <DashboardFileInput name="profile_image" v-model="form.profileImage">
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
            v-model="username"
            label="Username"
            placeholder="name"
            @edit="toggleNewUsernameInputVisibility"
          />
          <ProfileInput
            v-if="newUsernameInputVisibility"
            v-model="newUsername"
            clearable
            label="New username"
            placeholder="New username"
          />

          <ProfileInput
            v-model="email"
            label="Email"
            :value="authStore.user.email"
            placeholder="email"
            @edit="toggleNewEmailInputVisibility"
          />
          <ProfileInput
            v-if="newEmailInputVisibility"
            v-model="newEmail"
            clearable
            label="New email"
            placeholder="Enter new email"
          />

          <ProfileInput
            label="Password"
            :value="authStore.user.name"
            placeholder="password"
            @edit="toggleNewPasswordInputVisibility"
          />

          <div v-if="newPasswordInputVisibility" class="flex flex-col gap-14 text-left">
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
              v-model="newPassword"
              clearable
              type="password"
              label="New password"
              placeholder="New password"
            />
            <ProfileInput
              v-model="confirmNewPassword"
              clearable
              type="password"
              label="Confirm new password"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end gap-6 mt-16">
        <span class="hover:cursor-pointer text-gray-smoke">Cancel</span>
        <ActionButton v-if="saveChangesButtonVisibility" type="primary">Save Changes</ActionButton>
      </div>
    </div>
  </DashBoardWrapper>
</template>
