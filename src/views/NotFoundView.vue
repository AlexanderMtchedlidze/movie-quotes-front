<script setup>
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const localizationStore = useLocalization()

const { mediumFontClass, boldFontClass } = storeToRefs(localizationStore)
</script>

<template>
  <div class="bg-dashboard-gradient h-screen flex flex-col items-center justify-center text-white">
    <div class="flex flex-col items-center gap-7 relative">
      <img src="/soul.png" :alt="$t('alts.soul_image')" class="w-32" />
      <img src="/wormhole.png" :alt="$t('alts.wormhole_image')" class="w-28" />
      <h1 :class="boldFontClass" class="text-3xl md:text-5xl mt-2">{{ $t('not_found.whoops') }}</h1>
    </div>
    <div class="mt-2">
      <p :class="mediumFontClass" class="text-base md:text-2xl text-center">
        {{ $t('not_found.we_cant_see_the_page_you_are_looking_for') }}
      </p>
    </div>
    <ActionButton link href="/" type="primary" class="mt-8 md:mt-12">{{
      $t('not_found.return_home')
    }}</ActionButton>
  </div>
</template>
