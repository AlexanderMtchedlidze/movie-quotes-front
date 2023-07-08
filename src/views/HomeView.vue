<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useLoginDialogVisibility } from '@/stores/login'
import { useSignUpDialogVisibility } from '@/stores/signup'

import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)

const signUpDialogVisibility = useSignUpDialogVisibility()

const loginDialogVisibility = useLoginDialogVisibility()

const BaseMovieQuote = defineAsyncComponent(() => import('@/components/ui/BaseMovieQuote.vue'))

const responsiveActionClass = computed(() => 'py-1.5 px-3.5 text-sm md:text-base')
</script>

<template>
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
            >
              <span class="block md:hidden">
                {{ $t('home.header.actions.sign_up') }}
              </span>
              <span class="hidden md:block">
                {{ $t('home.header.actions.sign_up_long') }}
              </span>
            </ActionButton>
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
    :quote="$t('home.quotes.interstellar.quote')"
    :movie="$t('home.quotes.interstellar.title')"
  />
  <BaseMovieQuote
    class="bg-the-royal-tenenbaums"
    :quote="$t('home.quotes.the_royal_tenenbaums.quote')"
    :movie="$t('home.quotes.the_royal_tenenbaums.title')"
  />
  <BaseMovieQuote
    class="bg-the-lord-of-rings"
    :quote="$t('home.quotes.the_lord_of_rings.quote')"
    :movie="$t('home.quotes.the_lord_of_rings.title')"
  />
  <footer class="bg-midnight-blue text-xs uppercase text-creme-brulee ps-10 md:ps-16 py-2">
    &copy; {{ $t('home.footer') }}
  </footer>
</template>
