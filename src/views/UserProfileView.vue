<script setup>
import { ref, computed, defineAsyncComponent, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useErrorHandling } from '@/hooks/useErrorHandling'

import {
  nameRules,
  passwordRules,
  passwordConfirmedRules
} from '@/config/vee-validate/utils/constants'

const profileStore = useProfileStore()
const authStore = useAuthStore()

const userProfileImageSrc = computed(() => useUserProfileImagePath(authStore.user.profile_image))

const onSubmit = async (_, actions) => {
  try {
    await profileStore.handleUpdatingUser()
    actions.resetForm()
  } catch (e) {
    const errors = e.response.data.errors
    useErrorHandling(errors, actions)
  }
}

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

const DashBoardWrapper = defineAsyncComponent(() =>
  import('@/components/wrapper/DashboardWrapper.vue')
)
const BackwardNavigation = defineAsyncComponent(() =>
  import('@/components/navigation/BackwardNavigation.vue')
)
const ProfileInput = defineAsyncComponent(() => import('@/components/form/ProfileInput.vue'))
const DisabledTextInput = defineAsyncComponent(() =>
  import('@/components/form/DisabledTextInput.vue')
)
const BaseProfileDialog = defineAsyncComponent(() =>
  import('@/components/ui/BaseProfileDialog.vue')
)
const BaseErrorPanel = defineAsyncComponent(() => import('@/components/ui/BaseErrorPanel.vue'))
</script>

<template>
  <teleport to="body">
    <div
      v-if="profileStore.successMessageVisibility"
      @click="profileStore.toggleSuccessMessageVisibility"
      class="fixed md:hidden top-[5.5rem] left-0 h-full w-full bg-[#181623] bg-opacity-75 bg-message-gradient z-10"
    ></div>
    <div
      v-if="profileStore.successMessageVisibility"
      class="fixed flex md:hidden gap-2 top-28 left-1/2 -translate-x-1/2 z-10 w-[90%] rounded bg-alert-succes p-4"
    >
      <img src="@/assets/icons/notification/success.svg" alt="Success icon" />
      <p class="text-success-text">{{ $t('profile.changes_updated_successfully') }}</p>
      <img
        src="@/assets/icons/black-crossing.svg"
        alt="Crossing icon"
        class="ml-auto hover:cursor-pointer"
        @click="profileStore.toggleSuccessMessageVisibility"
      />
    </div>
  </teleport>

  <DashBoardWrapper>
    <div class="w-full lg:w-11/12 xl:w-9/12 relative pb-0 md:pb-44">
      <header class="md:pb-32">
        <h4 class="font-medium pt-8 text-2xl hidden md:block ps-12">{{ $t('profile.title') }}</h4>
        <div
          class="fixed bg-midnight-blue w-full bg-ref top-[5.5rem] z-10 block md:hidden py-6 ps-9"
        >
          <BackwardNavigation />
        </div>
      </header>
      <div
        class="px-8 md:px-24 lg:px-48 xl:px-48 text-center bg-midnight-creme-brulee pb-40 md:bg-midnight-blue rounded-none md:rounded-xl"
      >
        <header class="mb-10 pt-20 md:pt-6">
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="w-48 h-48 mb-1 mx-auto rounded-full block md:hidden"
          />
          <img
            :src="userProfileImageSrc"
            alt="User profile image"
            class="w-48 h-48 rounded-full hidden md:block absolute top-24 left-1/2 -translate-x-1/2"
          />
        </header>
        <Form
          v-slot="{ meta, values }"
          @submit="onSubmit"
          class="flex flex-col gap-14 pb-20 md:pb-0"
        >
          <div class="pt-0 md:pt-20">
            <Field name="profile_image" v-slot="{ handleChange, handleBlur }">
              <input
                id="profile_image"
                type="file"
                class="hidden"
                @blur="handleBlur"
                @change="profileStore.handleProfileImageChange($event, handleChange)"
              />
              <div class="flex flex-col">
                <label for="profile_image" class="text-xl hover:cursor-pointer">{{
                  $t('profile.upload_new_photo')
                }}</label>

                <ErrorMessage name="profile_image" class="text-red-error" />
              </div>
            </Field>
          </div>
          <BaseProfileDialog
            :meta="meta"
            :show="profileStore.profileImageDialogVisibility"
            @close="profileStore.toggleProfileImageDialogVisibility"
            moveToConfirmation
          />
          <BaseProfileDialog
            :meta="meta"
            :show="profileStore.usernameDialogVisibility"
            @close="profileStore.toggleUsernameDialogVisibility"
          >
            <ProfileInput
              v-model="profileStore.username"
              name="username"
              :rules="nameRules"
              :label="$t('profile.form.new_username.label')"
              :placeholder="$t('profile.form.new_username.placeholder')"
              class="gap-2"
            />
          </BaseProfileDialog>
          <BaseProfileDialog
            :meta="meta"
            :show="profileStore.emailDialogVisibility"
            @close="profileStore.toggleEmailDialogVisibility"
          >
            <ProfileInput
              v-model="profileStore.email"
              name="email"
              rules="required|email"
              :label="$t('profile.form.new_email.label')"
              :placeholder="$t('profile.form.new_email.placeholder')"
              class="gap-2"
            />
          </BaseProfileDialog>
          <BaseProfileDialog
            :meta="meta"
            :show="profileStore.passwordsDialogVisibility"
            @close="profileStore.togglePasswordsDialogVisibility"
          >
            <BaseErrorPanel title="Passwords should contain:">
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
            </BaseErrorPanel>

            <ProfileInput
              v-if="!authStore.user.google_token"
              v-model="profileStore.password"
              :rules="passwordRules"
              name="password"
              type="password"
              :label="$t('profile.form.new_password.label')"
              :placeholder="$t('profile.form.new_password.placeholder')"
              @update:errorMessage="passwordError = $event"
              class="gap-2"
            />
            <ProfileInput
              v-if="!authStore.user.google_token"
              v-model="profileStore.passwordConfirmation"
              :rules="passwordConfirmedRules"
              name="password_confirmation"
              type="password"
              :label="$t('profile.form.confirm_new_password.label')"
              :placeholder="$t('profile.form.confirm_new_password.placeholder')"
              class="gap-2"
            />
          </BaseProfileDialog>

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
            v-if="!authStore.user.google_token"
            name="prefilledPassword"
            :label="$t('signup.form.password.label')"
            :placeholder="$t('profile.form.current_password')"
            @edit="profileStore.togglePasswordInputsVisibility"
          />

          <div v-if="profileStore.passwordInputsVisibility" class="flex flex-col gap-14 text-left">
            <BaseErrorPanel title="Passwords should contain" class="hidden md:block">
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
            </BaseErrorPanel>

            <ProfileInput
              v-if="!authStore.user.google_token"
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
              v-if="!authStore.user.google_token"
              v-model="profileStore.passwordConfirmation"
              :rules="passwordConfirmedRules"
              name="password_confirmation"
              type="password"
              :label="$t('profile.form.confirm_new_password.label')"
              :placeholder="$t('profile.form.confirm_new_password.placeholder')"
              class="hidden md:flex"
            />
          </div>
          <div class="hidden md:block" v-if="(meta.touched && meta.valid) || values.profile_image">
            <div class="flex items-center justify-end gap-6 mt-16">
              <span
                @click="profileStore.clearValues"
                class="hover:cursor-pointer text-gray-smoke"
                >{{ $t('profile.form.actions.cancel') }}</span
              >
              <ActionButton submit type="primary">{{
                $t('profile.form.actions.save_changes')
              }}</ActionButton>
            </div>
          </div>
        </Form>
      </div>
      <div class="block md:hidden h-full bg-midnight-blue"></div>
    </div>
  </DashBoardWrapper>
</template>
