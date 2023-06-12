<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
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
  }
})

const emit = defineEmits(['close'])

const tryClose = () => {
  if (props.fixed) {
    return
  }
  emit('close')
}

const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-dashboard-gradient opacity-75 bg-opacity-75 overflow-y-auto backdrop-blur-sm"
      @click="tryClose"
    ></div>
    <dialog
      open
      v-if="show"
      class="fixed px-0 top-0 md:top-24 w-full md:w-1/2 lg:w-7/12 h-auto md:max-h-[90%] z-10 rounded bg-midnight-blue text-white text-center overflow-y-auto"
    >
      <header class="relative">
        <slot name="image">
          <img v-if="imgSrc" :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mb-10" />
        </slot>
        <slot name="header">
          <h2 class="text-xl md:text-2xl pt-10 pb-6 font-medium border-b-2 border-light-midnight">
            {{ title }}
          </h2>
        </slot>
        <img
          src="@/assets/icons/crossing-icon.svg"
          alt="Dialog closing icon"
          class="absolute top-12 right-10 hover:cursor-pointer"
          @click="tryClose"
        />
      </header>
      <div class="px-8 mt-7">
        <UserProfileCard class="mb-10" />
        <slot></slot>
      </div>
      <footer class="mt-10">
        <slot name="footer"></slot>
      </footer>
    </dialog>
  </teleport>
</template>
