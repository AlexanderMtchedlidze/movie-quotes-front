<script setup>
import { ref, computed, defineAsyncComponent, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { useUserProfileImagePath } from '@/hooks/useFullImagePath'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useLocalization } from '@/stores/localization'

import {
  nonRequiredNameRules,
  nonRequiredPasswordRules,
  nonRequiredPasswordConfirmedRules
} from '@/config/vee-validate/utils/constants'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const authStore = useAuthStore()
const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

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

const usernameMeta = ref(null)
const emailMeta = ref(null)
const passwordMeta = ref(null)
const confirmPasswordMeta = ref(null)

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
      class="fixed top-[5.5rem] left-0 h-full w-full bg-[#181623] bg-opacity-75 bg-message-gradient z-10"
    ></div>
    <div
      v-if="profileStore.successMessageVisibility"
      class="fixed flex gap-2 top-28 left-1/2 -translate-x-1/2 z-10 w-[90%] rounded bg-alert-succes p-4"
      :class="mediumFontClass"
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
    <div class="w-full lg:w-11/12 xl:w-9/12 relative pb-0 md:pb-40">
      <header class="md:pb-32">
        <h4 :class="mediumFontClass" class="pt-8 text-2xl hidden md:block ps-12">
          {{ $t('profile.title') }}
        </h4>
        <div
          class="fixed bg-midnight-blue w-full bg-ref top-[5.5rem] z-10 block md:hidden py-6 ps-9"
        >
          <BackwardNavigation @close-dialogs="handleClosingDialogs" />
        </div>
      </header>
      <div
        class="md:pb-28 px-8 md:px-24 lg:px-48 xl:px-48 text-center bg-midnight-creme-brulee md:bg-midnight-blue rounded-none md:rounded-xl"
      >
        <header class="mb-0 md:mb-10 pt-20 md:pt-6">
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
          v-slot="{ meta, values, setErrors }"
          @submit="onSubmit"
          class="flex flex-col gap-14 pb-20 md:pb-0"
        >
          <div class="pt-1 md:pt-10">
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
            :setErrors="setErrors"
            :show="profileStore.profileImageDialogVisibility"
            @close="profileStore.toggleProfileImageDialogVisibility"
            moveToConfirmation
            name="profile_image"
          />
          <BaseProfileDialog
            :setErrors="setErrors"
            :show="profileStore.usernameDialogVisibility"
            @close="profileStore.toggleUsernameDialogVisibility"
            name="username"
            :meta="usernameMeta"
          >
            <ProfileInput
              v-model="profileStore.username"
              name="username"
              :rules="nonRequiredNameRules"
              :label="$t('profile.form.new_username.label')"
              :placeholder="$t('profile.form.new_username.placeholder')"
              class="gap-2"
              @update:meta="usernameMeta = $event"
            />
          </BaseProfileDialog>
          <BaseProfileDialog
            :setErrors="setErrors"
            :show="profileStore.emailDialogVisibility"
            @close="profileStore.toggleEmailDialogVisibility"
            :onSubmit="onSubmit"
            name="email"
            :meta="emailMeta"
          >
            <ProfileInput
              v-model="profileStore.email"
              name="email"
              rules="email"
              :label="$t('profile.form.new_email.label')"
              :placeholder="$t('profile.form.new_email.placeholder')"
              class="gap-2"
              @update:meta="emailMeta = $event"
            />
          </BaseProfileDialog>
          <BaseProfileDialog
            :setErrors="setErrors"
            :show="profileStore.passwordsDialogVisibility"
            @close="profileStore.togglePasswordsDialogVisibility"
            name="password"
            :meta="confirmPasswordMeta"
          >
            <ProfileInput
              v-if="!authStore.user.google_token"
              v-model="profileStore.password"
              :rules="nonRequiredPasswordRules"
              name="password"
              type="password"
              :label="$t('profile.form.new_password.label')"
              :placeholder="$t('profile.form.new_password.placeholder')"
              @update:errorMessage="passwordError = $event"
              @update:meta="passwordMeta = $event"
              class="gap-2 mt-4"
            />
            <ProfileInput
              v-if="!authStore.user.google_token"
              v-model="profileStore.passwordConfirmation"
              :rules="nonRequiredPasswordConfirmedRules"
              name="password_confirmation"
              type="password"
              :label="$t('profile.form.confirm_new_password.label')"
              :placeholder="$t('profile.form.confirm_new_password.placeholder')"
              class="gap-2 mt-4"
              @update:meta="confirmPasswordMeta = $event"
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
            :rules="nonRequiredNameRules"
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
            rules="email"
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
            <BaseErrorPanel :title="$t('profile.passwords_should_contain')" class="hidden md:block">
              <div class="flex gap-1.5">
                <img
                  v-if="lessThanMinValidity"
                  src="@/assets/icons/input/green-eclipse.svg"
                  alt="Green eclipse"
                />
                <img v-else src="@/assets/icons/input/gray-eclipse.svg" alt="Gray eclipse" />
                <span>{{ $t('profile.more_characters') }}</span>
              </div>
              <div class="flex gap-1.5">
                <img
                  v-if="moreThanMaxOrRegistreValidity"
                  src="@/assets/icons/input/green-eclipse.svg"
                  alt="Green eclipse"
                />
                <img v-else src="@/assets/icons/input/gray-eclipse.svg" alt="Gray eclipse" />
                <span>{{ $t('profile.lowercase_characters') }}</span>
              </div>
            </BaseErrorPanel>

            <ProfileInput
              v-if="!authStore.user.google_token"
              v-model="profileStore.password"
              :rules="nonRequiredPasswordRules"
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
              :rules="nonRequiredPasswordConfirmedRules"
              name="password_confirmation"
              type="password"
              :label="$t('profile.form.confirm_new_password.label')"
              :placeholder="$t('profile.form.confirm_new_password.placeholder')"
              class="hidden md:flex"
            />
          </div>
          <div
            class="absolute bottom-14 right-0 hidden md:block"
            v-if="
              (values.username || values.email || values.profile_image || values.password) &&
              meta.valid
            "
          >
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
      <div class="fixed md:hidden h-screen bg-midnight-blue"></div>
    </div>
  </DashBoardWrapper>
</template>
