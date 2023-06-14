<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useI18n } from 'vue-i18n'

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
  },
  moveToConfirmation: {
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

const confirmationPromptVisibility = ref(props.moveToConfirmation)

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

const { t } = useI18n()

const editText = computed(
  () =>
    t('profile.form.actions.edit').charAt(0).toUpperCase() + t('profile.form.actions.edit').slice(1)
)
</script>

<template>
  <teleport to="body">
    <div
      v-if="show && !confirmationPromptVisibility && !moveToConfirmation"
      class="fixed top-0 left-0 h-full w-screen z-1 md:hidden"
      :class="shadowClass"
    ></div>
    <dialog
      open
      v-if="show && !confirmationPromptVisibility && !moveToConfirmation"
      class="fixed px-0 top-[9.5rem] w-full bg-midnight-creme-brulee text-white z-1 md:hidden"
    >
      <div class="flex flex-col gap-1 pt-20 px-8 pb-16 rounded-xl">
        <slot></slot>
        <span class="text-red">
          {{ errors }}
        </span>
      </div>
      <footer class="px-12 pt-10 flex items-center justify-between">
        <span class="text-input-disabled-border hover:cursor-pointer" @click="tryClose">{{
          $t('profile.form.actions.cancel')
        }}</span>
        <ActionButton
          type="primary"
          @click="toggleConfirmationPromptVisibility"
          :disabled="!isDisabled"
          >{{ editText }}</ActionButton
        >
      </footer>
    </dialog>
    <div
      v-if="show && confirmationPromptVisibility"
      class="fixed top-0 left-0 h-screen w-screen z-10 md:hidden opacity-70"
      :class="shadowClass"
    ></div>
    <dialog
      open
      v-if="show && confirmationPromptVisibility"
      class="fixed z-10 h-screen bg-dashboard-gradient px-0 py-0 top-[9.5rem] w-full text-white md:hidden"
    >
      <div class="mx-auto bg-confirmation-prompt-gradient rounded-lg backdrop-blur-xl w-[90%]">
        <div class="pb-9 pt-16 px-auto">
          <p class="text-center">{{ $t('profile.are_you_sure_to_make_changes') }}</p>
        </div>
        <footer
          class="border-t border-input-disabled-border/20 px-9 py-5 flex justify-between items-center"
        >
          <span
            class="text-input-disabled-border hover:cursor-pointer"
            @click="toggleConfirmationPromptVisibility"
            >{{ $t('profile.form.actions.cancel') }}</span
          >
          <ActionButton type="primary" @click="onSubmit">{{
            $t('profile.form.actions.confirm')
          }}</ActionButton>
        </footer>
      </div>
    </dialog>
  </teleport>
</template>
