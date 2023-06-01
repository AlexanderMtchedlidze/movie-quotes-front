<script setup>
import { defineAsyncComponent } from 'vue'

const ForgotPasswordDialog = defineAsyncComponent(() => import('./ForgotPasswordDialog.vue'))

const LoginDialog = defineAsyncComponent(() => import('./LoginDialog.vue'))
const SignUpDialog = defineAsyncComponent(() => import('./SignUpDialog.vue'))

const ResetPasswordDialog = defineAsyncComponent(() => import('./ResetPasswordDialog.vue'))
</script>

<template>
  <SignUpDialog />
  <LoginDialog />
  <ForgotPasswordDialog />
  <ResetPasswordDialog />
</template>
