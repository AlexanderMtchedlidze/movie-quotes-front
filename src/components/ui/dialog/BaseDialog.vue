<script setup>
import { defineAsyncComponent } from 'vue'

const BaseDialogSection = defineAsyncComponent(() => import('./BaseDialogSection.vue'))

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
  }
})

const emit = defineEmits(['close'])

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
        <header class="w-full flex flex-col gap-3 mt-1">
          <slot name="header">
            <h2 class="text-3xl">{{ title }}</h2>
          </slot>
          <slot name="subtitle">
            <h4 class="text-gray-md">{{ subtitle }}</h4>
          </slot>
        </header>
        <BaseDialogSection class="gap-6 mt-4">
          <slot></slot>
        </BaseDialogSection>
        <BaseDialogSection class="gap-4 mt-6">
          <slot name="actions"></slot>
        </BaseDialogSection>
        <BaseDialogSection class="mt-8 gap-1 text-gray-sm" type="row">
          <slot name="footer"></slot>
        </BaseDialogSection>
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
