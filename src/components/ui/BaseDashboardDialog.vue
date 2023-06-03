<script setup>
import { computed, defineAsyncComponent } from 'vue'

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

const wrapperClass = computed(() => 'px-8')

const UserProfileCard = defineAsyncComponent(() => import('../user/UserProfileCard.vue'))
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
        class="fixed px-0 top-0 md:top-28 w-full md:w-1/2 lg:w-7/12 h-full md:h-auto md:max-h-[90%] z-10 rounded bg-midnight-blue text-white text-center overflow-y-auto"
      >
        <header>
          <slot name="image">
            <img v-if="imgSrc" :src="imgSrc" :alt="alt" class="w-14 h-14 mt-16 mb-10" />
          </slot>
          <slot name="header">
            <h2 class="text-xl md:text-2xl pt-10 pb-6 font-medium border-b-2 border-light-midnight">
              {{ title }}
            </h2>
          </slot>
        </header>
        <section :class="wrapperClass" class="flex-col mt-7">
          <div class="flex items-center gap-4 mb-10">
           <UserProfileCard />
          </div>
          <slot></slot>
        </section>
        <footer :class="wrapperClass" class="my-10">
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
