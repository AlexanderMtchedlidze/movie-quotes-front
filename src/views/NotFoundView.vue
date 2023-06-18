<script setup>
import { defineAsyncComponent } from 'vue'

const BaseErrorWrapper = defineAsyncComponent(() => import('../components/ui/BaseErrorWrapper.vue'))
</script>

<template>
  <BaseErrorWrapper
    :title="$t('not_found.whoops')"
    :helper-text="$t('not_found.we_cant_see_the_page_you_are_looking_for')"
  >
    <img src="/404-soul.png" :alt="$t('alts.soul_image')" class="w-32" />
    <img src="/404-wormhole.png" :alt="$t('alts.wormhole_image')" class="w-28" />
  </BaseErrorWrapper>
</template>
