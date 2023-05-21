<script setup>
import { useForm } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSignUpDialogVisibility } from '@/stores/signup/signUpDialogVisibility.js'
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility.js'

const SignUpDialog = defineAsyncComponent(() => import('../components/signup/SignUpDialog.vue'))
const LoginDialog = defineAsyncComponent(() => import('../components/login/LoginDialog.vue'))

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()

const meta = useForm()

const { t } = useI18n()
</script>

<template>
  <header class="flex justify-between pt-8 px-16">
    <h3 class="uppercase font-medium text-creme-brulee">{{ t('home.header.title') }}</h3>
    <div class="flex gap-8 items-center">
      <LangDropdown />
      <nav>
        <ul class="flex gap-4">
          <li>
            <ActionButton
              type="primary"
              @click="signUpDialogVisibility.toggleSignUpDialogVisibility"
              >{{ t('home.header.actions.sign_up') }}</ActionButton
            >
            <SignUpDialog />
          </li>
          <li>
            <ActionButton
              type="outline"
              @click="loginDialogVisibility.toggleLoginDialogVisibility"
              >{{ t('home.header.actions.login') }}</ActionButton
            >
            <LoginDialog />
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="flex flex-col gap-8 items-center justify-center h-[70vh]">
      <p
        class="text-creme-brulee font-bold text-6xl text-center"
        v-html="t('home.main.paragraph')"
      ></p>
      <ActionButton type="primary" padding="sm">{{ t('home.main.actions.get_started') }} </ActionButton>
    </div>
  </main>
</template>
