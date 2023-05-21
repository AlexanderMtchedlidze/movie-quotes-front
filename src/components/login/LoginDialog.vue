<script setup>
import { useLoginDialogVisibility } from '@/stores/login/loginDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const GoogleButton = defineAsyncComponent(() => import('../ui/button/GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('../ui/link/BaseLink.vue'))
const CheckBoxInput = defineAsyncComponent(() => import("../ui/form/CheckBoxInput.vue"))

const loginDialogVisibility = useLoginDialogVisibility()
const { isLoginDialogDisplayed } = storeToRefs(loginDialogVisibility)
</script>

<template>
  <BaseDialog
    title="Log in to your account"
    subtitle="Welcome back! Please enter your details."
    :show="isLoginDialogDisplayed"
    @close="loginDialogVisibility.toggleLoginDialogVisibility"
   >
   <template #default>
     <TextInput label="Email" name="email" placeholder="Enter your email" />
     <TextInput label="Password" name="password" placeholder="Password" />
     <div class="flex justify-between">
      <CheckBoxInput label="Remember me" name="remember-me" />
      <BaseLink to="/">Forgot password</BaseLink>
     </div>
   </template>
    <template #actions>
      <ActionButton type="primary" submit>Sign in</ActionButton>
      <GoogleButton>Sign in with Google</GoogleButton>
    </template>
    <template #footer>
      <p>
        Don't have an account?
        <BaseLink to="/">Sign Up</BaseLink>
      </p>
    </template>
  </BaseDialog>
</template>
