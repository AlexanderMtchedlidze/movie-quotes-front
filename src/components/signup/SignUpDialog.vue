<script setup>
import { useSignUpDialogVisibility } from '@/stores/signUpDialogVisibility'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const GoogleButton = defineAsyncComponent(() => import('../ui/button/GoogleButton.vue'))
const BaseLink = defineAsyncComponent(() => import('../ui/link/BaseLink.vue'))

const signUpDialogVisibility = useSignUpDialogVisibility()
const { isSignUpDialogDisplayed } = storeToRefs(signUpDialogVisibility)
</script>

<template>
  <BaseDialog
    title="Create an account"
    subtitle="Start your journey!"
    :show="isSignUpDialogDisplayed"
    @close="signUpDialogVisibility.toggleSignUpDialogVisibility"
  >
    <template #default>
      <TextInput label="Name" name="name" placeholder="At least 3 & max.15 lower case characters" />
      <TextInput label="Email" name="email" placeholder="Enter your email" />
      <TextInput
        label="Password"
        name="password"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <TextInput
        label="Confirm password"
        name="password_confirmed"
        placeholder="Confirm password"
      />
    </template>
    <template #actions>
      <ActionButton type="primary" submit>Get started</ActionButton>
      <GoogleButton>Sign up with Google</GoogleButton>
    </template>
    <template #footer>
      <p>
        Already have an account?
        <BaseLink to="/">Log in</BaseLink>
      </p>
    </template>
  </BaseDialog>
</template>
