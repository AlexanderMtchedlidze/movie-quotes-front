<script setup>
import { useForm } from 'vee-validate'
import { defineAsyncComponent } from 'vue'
import { useSignUpDialogVisibility } from '@/stores/signUpDialogVisibility'

const signUpDialogVisibility = useSignUpDialogVisibility()

const meta = useForm()

const SignUpDialog = defineAsyncComponent(() => import('../components/signup/SignUpDialog.vue'))
</script>

<template>
  <header class="flex justify-between pt-8 px-16">
    <h3 class="uppercase font-medium text-creme-brulee">movie quotes</h3>
    <div class="flex gap-8 items-center">
      <LangDropdown />
      <nav>
        <ul class="flex gap-4">
          <li>
            <ActionButton
              type="primary"
              @click="signUpDialogVisibility.toggleSignUpDialogVisibility"
              >Sign Up</ActionButton
            >
            <SignUpDialog />
          </li>
          <li>
            <ActionButton type="outline" @click="toggleLoginDialogVisibility">Log in</ActionButton>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="flex flex-col gap-8 items-center justify-center h-[70vh]">
      <p class="text-creme-brulee font-bold text-6xl text-center">
        Find any quote in <br />
        millions of movie lines
      </p>
      <ActionButton type="primary" padding="sm">Get started</ActionButton>
    </div>
  </main>
</template>
