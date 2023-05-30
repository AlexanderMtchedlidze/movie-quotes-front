<script setup>
import { defineAsyncComponent } from 'vue'
import { useSignUpDialogVisibility } from '@/stores/signup'
import { useLoginDialogVisibility } from '@/stores/login'
import { computed } from 'vue'

const ForgotPasswordDialog = defineAsyncComponent(() =>
  import('../components/dialog/ForgotPasswordDialog.vue')
)

const LoginDialog = defineAsyncComponent(() => import('../components/dialog/LoginDialog.vue'))
const SignUpDialog = defineAsyncComponent(() => import('../components/dialog/SignUpDialog.vue'))

const ResetPasswordDialog = defineAsyncComponent(() =>
  import('../components/dialog/ResetPasswordDialog.vue')
)

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()

const responsiveActionClass = computed(() => 'py-1.5 px-3.5 text-sm md:text-base')
</script>

<template>
  <SignUpDialog />
  <LoginDialog />
  <ForgotPasswordDialog />
  <ResetPasswordDialog />
  <header class="flex justify-between pt-6 md:pt-8 px-4 md:px-16">
    <h3 class="uppercase font-medium text-creme-brulee">{{ $t('home.header.title') }}</h3>
    <div class="flex gap-8 items-center">
      <LangDropdown />
      <nav>
        <ul class="flex gap-4">
          <li>
            <ActionButton
              type="primary"
              :class="responsiveActionClass"
              @click="signUpDialogVisibility.toggleSignUpDialogVisibility"
              >{{ $t('home.header.actions.sign_up') }}</ActionButton
            >
          </li>
          <li>
            <ActionButton
              type="outline"
              :class="responsiveActionClass"
              @click="loginDialogVisibility.toggleLoginDialogVisibility"
              >{{ $t('home.header.actions.login') }}</ActionButton
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="flex flex-col gap-8 items-center justify-center h-[70vh]">
      <p
        class="text-creme-brulee font-bold text-4xl md:text-6xl text-center"
        v-html="$t('home.main.paragraph')"
      ></p>
      <ActionButton type="primary" padding="sm" class="text:base md:text-xl" :class="responsiveActionClass"
        >{{ $t('home.main.actions.get_started') }}
      </ActionButton>
    </div>
  </main>
</template>
