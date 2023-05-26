<script setup>
import { computed } from 'vue'
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
  }
})

const emit = defineEmits(['close'])

const titleClass = computed(() => [
  'text-3xl',
  {
    'mt-1': !props.imgSrc,
    'mb-3': !props.imgSrc,
    'mt-5': props.imgSrc,
    'mb-6': props.imgSrc
  }
])

const tryClose = () => {
  if (props.fixed) {
    return
  }
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-black bg-opacity-75"
    ></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        class="fixed top-10 w-[40%] z-10 rounded bg-light-midnight text-white text-center"
      >
        <header>
          <slot name="image" v-if="imgSrc">
            <img :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mx-auto" />
          </slot>
          <slot name="header">
            <h2 :class="titleClass">{{ title }}</h2>
          </slot>
          <slot name="subtitle">
            <h4 class="text-gray-slate">{{ subtitle }}</h4>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <footer class="w-3/5 mx-auto flex justify-center mt-8 gap-1 text-gray-sm">
          <slot name="footer"></slot>
        </footer>
      </dialog>
    </transition>
  </teleport>
</template>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
