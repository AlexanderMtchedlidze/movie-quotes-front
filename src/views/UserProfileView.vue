<script setup>
import { ref, computed, defineAsyncComponent, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { Form } from 'vee-validate'

import {
  nameRules,
  passwordRules,
  passwordConfirmedRules
} from '@/config/vee-validate/utils/constants'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user.profile_image))

const onSubmit = async () => {
  const formData = new FormData()
  formData.append('profile_image', profileStore.profileImage)
  formData.append('email', profileStore.email)
  formData.append('username', profileStore.username)
  formData.append('password', profileStore.password)
  formData.append('password_confirmation', profileStore.passwordConfirmation)

  await profileStore.handleUpdatingUser(formData)
}

const DashBoardWrapper = defineAsyncComponent(() =>
  import('../components/wrapper/DashboardWrapper.vue')
)
const BackwardNavigation = defineAsyncComponent(() =>
  import('../components/navigation/BackwardNavigation.vue')
)
const ProfileInput = defineAsyncComponent(() => import('../components/form/ProfileInput.vue'))
const DisabledTextInput = defineAsyncComponent(() =>
  import('../components/form/DisabledTextInput.vue')
)
const DashboardFileInput = defineAsyncComponent(() =>
  import('../components/form/DashboardFileInput.vue')
)

const passwordError = ref(null)

const lessThanMinValidity = ref(false)
const moreThanMaxOrRegistreValidity = ref(false)

watch(passwordError, (newVal) => {
  lessThanMinValidity.value = true
  moreThanMaxOrRegistreValidity.value = true

  if (newVal) {
    if (newVal.includes('8')) {
      lessThanMinValidity.value = false
    } else if (
      newVal.includes('15') ||
      newVal.includes('registre') ||
      newVal.includes('რეგისტრის')
    ) {
      moreThanMaxOrRegistreValidity.value = false
    }
  }
})
</script>

<template>
  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 relative pb-0 md:pb-44">
      <header class="md:pb-32">
        <h4 class="font-medium pt-8 text-2xl hidden md:block ps-12">{{ $t('profile.title') }}</h4>
        <BackwardNavigation class="block md:hidden py-6 ps-9" />
      </header>
      <div
        class="px-8 md:px-24 lg:px-48 xl:px-48 text-center bg-midnight-creme-brulee md:bg-midnight-blue rounded-none md:rounded-xl"
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
            <DashboardFileInput name="profile_image" v-model="profileStore.profileImage">
              <template #trigger>
                <label for="profile_image" class="text-xl hover:cursor-pointer">{{
                  $t('profile.upload_new_photo')
                }}</label>
              </template>
            </DashboardFileInput>
          </div>
        </header>
        <div>
          <Form v-slot="{ meta }" @submit="onSubmit" class="flex flex-col gap-14 pb-40">
            <DisabledTextInput
              :value="authStore.user.name"
              name="prefilledUsername"
              :label="$t('login.form.username.label')"
              @edit="profileStore.toggleUsernameInputVisibility"
            />
            <ProfileInput
              v-if="profileStore.usernameInputVisibility"
              v-model="profileStore.username"
              name="username"
              :rules="nameRules"
              :label="$t('profile.form.new_username.label')"
              :placeholder="$t('profile.form.new_username.placeholder')"
              class="hidden md:flex"
            />

            <DisabledTextInput
              :value="authStore.user.email"
              name="preffilledEmail"
              :label="$t('signup.form.email.label')"
              @edit="profileStore.toggleEmailInputVisibility"
            />
            <ProfileInput
              v-if="profileStore.emailInputVisibility"
              v-model="profileStore.email"
              name="email"
              rules="required|email"
              :label="$t('profile.form.new_email.label')"
              :placeholder="$t('profile.form.new_email.placeholder')"
              class="hidden md:flex"
            />

            <DisabledTextInput
              name="prefilledPassword"
              :label="$t('signup.form.password.label')"
              :placeholder="$t('profile.form.current_password')"
              @edit="profileStore.togglePasswordInputsVisibility"
            />

            <div
              v-if="profileStore.passwordInputsVisibility"
              class="flex flex-col gap-14 text-left"
            >
              <div class="rounded border border-input-disabled-border/20 p-6 hidden md:block">
                <h4>Passwords should contain:</h4>
                <div class="mt-4 flex flex-col gap-1 justify-center text-sm tracking-wider">
                  <div v-if="lessThanMinValidity" class="flex gap-1.5">
                    <img src="@/assets/icons/input/green-eclipse.svg" alt="Green eclipse" />
                    <span>8 or more characters</span>
                  </div>
                  <div v-else class="flex gap-1.5">
                    <img src="@/assets/icons/input/gray-eclipse.svg" alt="Gray eclipse" />
                    <span class="text-dark-gray">8 or more characters</span>
                  </div>
                  <div v-if="moreThanMaxOrRegistreValidity" class="flex gap-1.5">
                    <img src="@/assets/icons/input/green-eclipse.svg" alt="Green eclipse" />
                    <span>15 lowercase character</span>
                  </div>
                  <div v-else class="flex gap-1.5">
                    <img src="@/assets/icons/input/gray-eclipse.svg" alt="Gray eclipse" />
                    <span class="text-dark-gray">15 lowercase character</span>
                  </div>
                </div>
              </div>

              <ProfileInput
                v-model="profileStore.password"
                :rules="passwordRules"
                name="password"
                type="password"
                :label="$t('profile.form.new_password.label')"
                :placeholder="$t('profile.form.new_password.placeholder')"
                class="hidden md:flex"
                @update:errorMessage="passwordError = $event"
              />
              <ProfileInput
                v-model="profileStore.passwordConfirmation"
                :rules="passwordConfirmedRules"
                name="password_confirmation"
                type="password"
                :label="$t('profile.form.confirm_new_password.label')"
                :placeholder="$t('profile.form.confirm_new_password.placeholder')"
                class="hidden md:flex"
              />
            </div>
            <div class="hidden md:block">
              <div class="flex items-center justify-end gap-6 mt-16">
                <span
                  v-if="meta.touched"
                  @click="profileStore.clearValues"
                  class="hover:cursor-pointer text-gray-smoke"
                  >{{ $t('profile.form.actions.cancel') }}</span
                >
                <ActionButton
                  v-if="(meta.touched && meta.valid) || profileStore.profileImage"
                  submit
                  type="primary"
                  >{{ $t('profile.form.actions.save_changes') }}</ActionButton
                >
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </DashBoardWrapper>
</template>
