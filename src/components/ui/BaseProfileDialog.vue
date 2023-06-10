<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const props = defineProps({
  meta: {
    type: Object,
    required: true
  },
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
  }
})

const emit = defineEmits(['close'])

const tryClose = () => {
  if (props.fixed) {
    return
  }
  emit('close')
}

const profileStore = useProfileStore()

const isDisabled = computed(() => props.meta.dirty && props.meta.valid)

const confirmationPromptVisibility = ref(false)

const toggleConfirmationPromptVisibility = () => {
  confirmationPromptVisibility.value = !confirmationPromptVisibility.value
}

const errors = ref(null)

const onSubmit = async () => {
  try {
    await profileStore.handleUpdatingUser()
  } catch (e) {
    errors.value = e.response.data.message
  }
  toggleConfirmationPromptVisibility()
}

const shadowClass = computed(() => ({
  'bg-midnight-blue': !confirmationPromptVisibility.value,
  'bg-dashboard-gradient': confirmationPromptVisibility.value
}))
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed top-0 left-0 h-full w-screen z-1 md:hidden"
      :class="shadowClass"
    ></div>
    <dialog
      open
      v-if="show && !confirmationPromptVisibility"
      class="fixed px-0 top-[9.5rem] w-full bg-midnight-creme-brulee text-white z-1 md:hidden"
    >
      <div class="flex flex-col gap-4 pt-20 px-8 pb-16 rounded-xl">
        <slot></slot>
        {{ errors }}
      </div>
      <footer class="px-12 pt-10 flex items-center justify-between">
        <span class="text-input-disabled-border hover:cursor-pointer" @click="tryClose"
          >Cancel</span
        >
        <ActionButton
          type="primary"
          @click="toggleConfirmationPromptVisibility"
          :disabled="!isDisabled"
          >Edit</ActionButton
        >
      </footer>
    </dialog>
    <dialog
      open
      v-if="show && confirmationPromptVisibility"
      class="fixed px-0 py-0 top-[9.5rem] w-full h-full bg-dashboard-gradient bg-opacity-70 text-white z-10 md:hidden"
    >
      <div
        class="mx-auto bg-confirmation-prompt-gradient rounded-lg backdrop-blur-xl bg-opacity-30 w-[90%]"
      >
        <div class="pb-9 pt-16 px-auto">
          <p class="text-center">Are you sure to make changes?</p>
        </div>
        <footer
          class="border-t border-input-disabled-border px-9 py-5 flex justify-between items-center"
        >
          <span
            class="text-input-disabled-border hover:cursor-pointer"
            @click="toggleConfirmationPromptVisibility"
            >Cancel</span
          >
          <ActionButton type="primary" @click="onSubmit">Confirm</ActionButton>
        </footer>
      </div>
    </dialog>
  </teleport>
</template>
