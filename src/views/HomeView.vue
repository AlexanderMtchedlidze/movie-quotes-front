<script setup>
import { defineAsyncComponent } from 'vue'
import { computed } from 'vue'

const DialogsBundle = defineAsyncComponent(() => import('../components/dialog/DialogsBundle.vue'))

const HomeHeader = defineAsyncComponent(() => import('../components/headers/HomeHeader.vue'))

const BaseMovieQuote = defineAsyncComponent(() => import('../components/ui/BaseMovieQuote.vue'))

const responsiveActionClass = computed(() => 'py-1.5 px-3.5 text-sm md:text-base')
</script>

<template>
  <DialogsBundle />
  <HomeHeader />
  <main class="bg-midnight-blue">
    <div class="flex flex-col gap-8 items-center justify-center h-[70vh]">
      <p
        class="text-creme-brulee font-bold text-4xl md:text-6xl text-center"
        v-html="$t('home.main.paragraph')"
      ></p>
      <ActionButton
        type="primary"
        padding="sm"
        class="text:base md:text-xl"
        :class="responsiveActionClass"
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
