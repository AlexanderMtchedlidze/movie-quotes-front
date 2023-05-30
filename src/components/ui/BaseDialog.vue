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

const tryClose = () => {
  if (props.fixed) {
    return
  }
  emit('close')
}

const wrapperClass = computed(() => 'w-4/5 lg:w-3/5 mx-auto flex')
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      @click="tryClose"
      class="fixed top-0 left-0 h-screen w-screen z-1 bg-black bg-opacity-75 overflow-y-auto"
    ></div>
    <transition name="dialog">
      <dialog
        open
        v-if="show"
        class="fixed top-0 md:top-10 w-full md:w-[50%] lg:w-[40%] h-full md:h-auto z-10 rounded bg-light-midnight text-white text-center overflow-y-auto"
      >
        <header>
          <slot name="image">
            <img v-if="imgSrc" :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mb-10 mx-auto" />
          </slot>
          <slot name="header">
            <h2 class="text-2xl md:text-3xl mt-8 font-medium">{{ title }}</h2>
          </slot>
          <slot name="subtitle">
            <h4 class="text-gray-slate mt-3">{{ subtitle }}</h4>
          </slot>
        </header>
        <section :class="wrapperClass" class="flex-col">
          <slot></slot>
        </section>
        <footer :class="wrapperClass" class="mt-4 text-gray-sm justify-center gap-1">
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
