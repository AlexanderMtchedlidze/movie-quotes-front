<script setup>
import { useSignUpDialogVisibility } from '@/stores/signUpDialogVisibility'
import { storeToRefs } from 'pinia'

const signUpDialogVisibility = useSignUpDialogVisibility()
const { isSignUpDialogDisplayed } =
  storeToRefs(signUpDialogVisibility)
</script>

<template>
  <BaseDialog
    title="Create an account"
    subtitle="Start your journey!"
    :show="isSignUpDialogDisplayed"
    @close="signUpDialogVisibility.toggleSignUpDialogVisibility"
  >
    <TextInput label="Name" name="name" placeholder="At least 3 & max.15 lower case characters" />
    <TextInput label="Email" name="email" placeholder="Enter your email" />
    <TextInput
      label="Password"
      name="password"
      placeholder="At least 3 & max.15 lower case characters"
    />
    <TextInput label="Confirm password" name="password_confirmed" placeholder="Confirm password" />
    <template #actions>
      <ActionButton type="primary" submit>Get started</ActionButton>
      <ActionButton type="outline" class="flex items-center justify-center gap-2">
        <img src="@/assets/icons/google-icon.svg" alt="Google icon" />
        <span>Sign up with Google</span>
      </ActionButton>
    </template>
    <template #footer>
      <p class="text-gray-sm">
        Already have an account?
        <a href="/login" class="underline text-link-blue">Log in</a>
      </p>
    </template>
  </BaseDialog>
</template>
