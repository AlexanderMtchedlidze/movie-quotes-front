<script setup>
import { defineAsyncComponent } from 'vue'

const BaseErrorWrapper = defineAsyncComponent(() => import('../components/ui/BaseErrorWrapper.vue'))
</script>

<template>
  <BaseErrorWrapper
    :title="$t('not_authorized.you_shall_not_pass')"
    :helper-text="$t('not_authorized.sorry_but_you_are_not_authorized')"
    mt="56"
  >
    <img src="/gandolf-back.png" :alt="$t('alts.gandolf_back_image')" class="absolute top-10" />
    <img src="/403-gandolf.png" :alt="$t('alts.gandolf_image')" class="absolute top-0" />
  </BaseErrorWrapper>
</template>
