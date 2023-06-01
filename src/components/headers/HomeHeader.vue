<script setup>
import { useSignUpDialogVisibility } from '@/stores/signup'
import { useLoginDialogVisibility } from '@/stores/login'

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()
</script>

<template>
  <header class="bg-midnight-blue flex items-center justify-between py-7 md:py-8 px-4 md:px-16">
    <h3 class="uppercase font-medium text-creme-brulee">{{ $t('home.header.title') }}</h3>
    <div class="flex gap-8 items-center">
      <LangDropdown />
      <nav>
        <ul class="flex gap-4">
          <li>
            <ActionButton
              type="primary"
              @click="signUpDialogVisibility.toggleSignUpDialogVisibility"
              >{{ $t('home.header.actions.sign_up') }}</ActionButton
            >
          </li>
          <li>
            <ActionButton
              type="outline"
              @click="loginDialogVisibility.toggleLoginDialogVisibility"
              >{{ $t('home.header.actions.login') }}</ActionButton
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
