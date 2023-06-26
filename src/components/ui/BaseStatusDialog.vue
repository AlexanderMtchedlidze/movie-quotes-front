<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia';

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false
  },
  fixed: {
    type: Boolean,
    required: false,
    default: false
  },
  imgSrc: {
    type: String,
    required: false
  },
  imgAlt: {
    type: String,
    required: false
  },
  statusDialog: {
    type: Boolean,
    required: false,
    default: false
  },
  top: {
    type: String,
    required: false,
    default: '20'
  }
})

const emit = defineEmits(['close'])

const smallScreen = 768

let isSmallScreen = ref(window.innerWidth <= smallScreen)

const handleResize = () => {
  isSmallScreen.value = window.innerWidth <= smallScreen
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const tryClose = (fixed = false) => {
  if (fixed) {
    emit('close')
  }
  if (!isSmallScreen.value) {
    emit('close')
  }
  if (!fixed && !isSmallScreen.value) {
    return
  }
}

const dialogClass = computed(() => [
  'fixed left-1/2 -translate-x-1/2 md:-translate-y-0 bg-confirmation-prompt-gradient md:bg-light-midnight md:w-1/2 lg:w-2/5 h-max-h-[40%] md:h-auto md:max-h-[90%] z-10 w-[90%] rounded text-white text-center overflow-y-auto ' +
    'top-' +
    props.top
])
const wrapperClass = computed(() => 'w-4/5 lg:w-3/5 mx-auto flex')
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose(false)"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-midnight-blue bg-opacity-100 md:bg-black md:bg-opacity-75 backdrop-blur-sm overflow-y-auto"
    ></div>
    <div v-if="show" :class="dialogClass">
      <header class="relative">
        <slot name="image">
          <img v-if="imgSrc" :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mb-10 mx-auto" />
        </slot>
        <slot name="header">
          <h2 :class="mediumFontClass" class="text-2xl md:text-3xl mt-8">{{ title }}</h2>
        </slot>
        <img
          src="@/assets/icons/crossing-icon.svg"
          :alt="$t('alts.cross_icon')"
          class="absolute top-3 right-10 block md:hidden hover:cursor-pointer"
          @click="tryClose(true)"
        />
        <slot name="subtitle">
          <h4 class="text-gray-slate mt-3">{{ subtitle }}</h4>
        </slot>
      </header>
      <section :class="wrapperClass" class="flex-col">
        <slot></slot>
      </section>
      <footer :class="wrapperClass" class="mt-8 mb-2 text-gray-sm justify-center gap-1">
        <slot name="footer"></slot>
      </footer>
    </div>
  </teleport>
</template>
