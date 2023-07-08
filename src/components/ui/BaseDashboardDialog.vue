<script setup>
import { useRoute } from 'vue-router'
import { computed, defineAsyncComponent } from 'vue'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
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
  },
  position: {
    type: String,
    required: false
  },
  profileCardSpacing: {
    type: String,
    required: false,
    default: 'mb-10'
  },
  showProfileCard: {
    type: Boolean,
    required: false,
    default: true
  },
  pb: {
    type: String,
    required: false,
    default: null
  }
})

const emit = defineEmits(['close'])

const tryClose = () => {
  emit('close')
}

const route = useRoute()

const moviesStore = useMoviesStore()

const dialogClass = computed(() => [
  'fixed px-0 top-20 md:top-24 w-full md:w-9/12 lg:w-7/12 xl:w-1/2 h-full md:h-auto md:max-h-[90%] z-1 rounded-lg bg-midnight-blue text-white text-center overflow-y-auto',
  {
    'left-0 lg:left-36': route.name === 'moviesList',
    'pb-40 md:pb-4': !moviesStore.newQuoteDialogVisibility,
    'pb-16 md:pb-0': moviesStore.newQuoteDialogVisibility
  }
])

const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-dashboard-gradient opacity-75 bg-opacity-75 overflow-y-auto backdrop-blur-sm"
      @click="tryClose"
    ></div>
    <dialog open v-if="show" :class="dialogClass" @drop.prevent="console.log('a')">
      <header class="relative">
        <slot name="header">
          <h2
            :class="mediumFontClass"
            class="text-xl md:text-2xl pt-5 pb-6 border-b-2 border-light-midnight"
          >
            {{ title }}
          </h2>
          <img
            src="@/assets/icons/crossing-icon.svg"
            alt="Dialog closing icon"
            class="absolute top-1/2 -translate-y-1/2 right-10 hover:cursor-pointer"
            @click="tryClose"
          />
        </slot>
      </header>
      <div class="px-8 mt-7" :class="mediumFontClass">
        <UserProfileCard v-if="showProfileCard" :class="profileCardSpacing" />
        <slot></slot>
      </div>
      <footer class="mt-10" :class="mediumFontClass">
        <slot name="footer"></slot>
      </footer>
    </dialog>
  </teleport>
</template>
