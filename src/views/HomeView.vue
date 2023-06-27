<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useLoginDialogVisibility } from '@/stores/login'
import { useSignUpDialogVisibility } from '@/stores/signup'

import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()

const DialogsBundle = defineAsyncComponent(() =>
  import('@/components/dialog/home/DialogsBundle.vue')
)

const BaseMovieQuote = defineAsyncComponent(() => import('@/components/ui/BaseMovieQuote.vue'))

const responsiveActionClass = computed(() => 'py-1.5 px-3.5 text-sm md:text-base')
</script>

<template>
  <DialogsBundle />
  <header class="bg-midnight-blue flex items-center justify-between py-7 md:py-8 px-4 md:px-16">
    <h3 :class="mediumFontClass" class="uppercase text-creme-brulee">
      {{ $t('home.header.title') }}
    </h3>
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
  <main class="bg-midnight-blue">
    <div class="flex flex-col gap-8 items-center justify-center h-[70vh]">
      <p
        :class="boldFontClass"
        class="text-creme-brulee text-4xl md:text-6xl text-center"
        v-html="$t('home.main.paragraph')"
      ></p>
      <ActionButton
        type="primary"
        padding="sm"
        class="text:base md:text-xl"
        :class="responsiveActionClass"
        @click="signUpDialogVisibility.toggleSignUpDialogVisibility"
        >{{ $t('home.main.actions.get_started') }}
      </ActionButton>
    </div>
  </main>
  <BaseMovieQuote
    class="bg-interstellar"
    quote='"You have to leave something <br />
      behind to go forward"'
    movie="Interstellar, 2014"
  />
  <BaseMovieQuote
    class="bg-the-royal-tenenbaums"
    quote='"I think we are just gonna have <br /> 
      to be secretly in love with each other <br />
      and leave it that"'
    movie="The Royal Tenenbaums, 2001"
  />
  <BaseMovieQuote
    class="bg-the-lord-of-rings"
    quote="I see in your eyes the same  <br /> fear 
      that would take the heart of me..."
    movie="The Lord of the Rings, 2003"
  />
</template>
