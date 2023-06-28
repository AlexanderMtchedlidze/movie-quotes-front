<script setup>
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)
</script>

<template>
  <div class="bg-dashboard-gradient h-screen flex flex-col items-center justify-center text-white">
    <div class="flex flex-col items-center gap-7 relative">
      <img
        src="/gandolf-back.png"
        :alt="$t('alts.gandolf_back_image')"
        class="absolute w-36 md:w-auto top-20 md:top-0"
      />
      <img src="/gandolf.png" :alt="$t('alts.gandolf_image')" class="absolute bottom-16 w-full" />
      <h1 :class="boldFontClass" class="text-3xl md:text-5xl mt-56">
        {{ $t('not_authorized.you_shall_not_pass') }}
      </h1>
    </div>
    <div class="mt-2">
      <p :class="mediumFontClass" class="text-base md:text-2xl text-center">
        {{ $t('not_authorized.sorry_but_you_are_not_authorized') }}
      </p>
    </div>
    <ActionButton link href="/" type="primary" class="mt-8 md:mt-12">{{
      $t('not_found.return_home')
    }}</ActionButton>
  </div>
</template>
