<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useLocalization } from '@/stores/localization'
import { useI18n } from 'vue-i18n'

defineProps({
  textSize: {
    type: String,
    required: false,
    default: 'text-sm md:text-base'
  }
})

const Dropdown = defineAsyncComponent(() => import('./Dropdown.vue'))
const DropdownItem = defineAsyncComponent(() => import('./DropdownItem.vue'))

const localizationStore = useLocalization()

const { t } = useI18n()

const currentLocale = computed(() => t(`lang_dropdown.${localizationStore.locale}`))

const setLocalization = (value) => {
  localizationStore.setLocale(value)
}
</script>

<template>
  <Dropdown>
    <template #trigger>
      <button class="flex items-center gap-3">
        <span class="text-white capitalize" :class="textSize">{{ currentLocale }}</span>
        <img src="@/assets/icons/dropdown-vector.svg" :alt="$t('alts.dropdown_arrow_vector')" />
      </button>
    </template>
    <template #default>
      <div class="absolute bg-light-midnight px-2 py-2 mt-2 rounded-xl w-full z-50">
        <DropdownItem
          value="ka"
          :textContent="t('lang_dropdown.ka')"
          @click="setLocalization('ka')"
        />
        <DropdownItem
          value="en"
          :textContent="t('lang_dropdown.en')"
          @set-locale="setLocalization"
          @click="setLocalization('en')"
        />
      </div>
    </template>
  </Dropdown>
</template>
