<script setup>
import { computed } from 'vue'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

defineProps({
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false
  },
  imgSrc: {
    type: String,
    required: false
  },
  imgAlt: {
    type: String,
    required: false
  }
})

const router = useRouter()

const tryClose = () => {
  router.push({ name: 'home' })
}

const wrapperClass = computed(() => 'w-4/5 lg:w-3/5 mx-auto flex')
</script>

<template>
  <teleport to="body">
    <div
      @click="tryClose"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-black bg-opacity-75 backdrop-blur-sm overflow-y-auto"
    ></div>
    <dialog
      open
      class="fixed top-0 md:top-10 2xl:top-32 w-full md:w-1/2 lg:w-2/5 h-full md:h-auto md:max-h-[90%] z-10 rounded-lg bg-midnight-blue md:bg-light-midnight text-white text-center overflow-y-auto"
      :class="mediumFontClass"
    >
      <header class="relative">
        <slot name="image">
          <img v-if="imgSrc" :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mb-10 mx-auto" />
        </slot>
        <slot name="header">
          <h2 :class="mediumFontClass" class="text-2xl md:text-3xl mt-8">
            {{ title }}
          </h2>
        </slot>
        <img
          src="@/assets/icons/crossing-icon.svg"
          :alt="$t('alts.cross_icon')"
          class="absolute top-3 right-10 block md:hidden hover:cursor-pointer"
          @click="tryClose"
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
    </dialog>
  </teleport>
</template>
