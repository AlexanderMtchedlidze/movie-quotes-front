<script setup>
import { ref, computed, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useI18n } from 'vue-i18n'
import { useLocalization } from '@/stores/localization'
import { storeToRefs } from 'pinia'

const props = defineProps({
  meta: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  setErrors: {
    type: Function,
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
  moveToConfirmation: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['close'])

const tryClose = () => {
  emit('close')
}

const profileStore = useProfileStore()

const dialogVisibility = ref(props.show)

const toggleDialogVisibility = () => {
  dialogVisibility.value = !dialogVisibility.value
}

watch(
  () => props.show,
  (newVal) => {
    dialogVisibility.value = newVal
  }
)

const confirmationPromptVisibility = ref(props.moveToConfirmation)

const toggleConfirmationPromptVisibility = () => {
  if (props.meta?.value) {
    confirmationPromptVisibility.value = !confirmationPromptVisibility.value
  }
}

const localizationStore = useLocalization()

const { mediumFontClass } = storeToRefs(localizationStore)

const onSubmit = async () => {
  try {
    if (props.name === 'username') await profileStore.handleUpdatingUsername()
    if (props.name === 'profile_image') await profileStore.handleUpdatingProfileImage()
    if (props.name === 'email') await profileStore.handleUpdatingEmail()
    if (props.name === 'password') await profileStore.handleUpdatingPasswords()
    toggleDialogVisibility()
  } catch (e) {
    const errors = e.response.data.errors
    for (const error in errors) {
      const errorText = errors[error][0][localizationStore.locale]?.toString()

      if (errorText) {
        props.setErrors({
          [error]: errorText
        })
      }
    }
  } finally {
    toggleConfirmationPromptVisibility()
  }
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
    <div :class="mediumFontClass">
      <div
        v-if="dialogVisibility && !confirmationPromptVisibility && !moveToConfirmation"
        class="fixed top-0 left-0 h-full w-screen z-1 md:hidden"
        :class="shadowClass"
      ></div>
      <dialog
        open
        v-if="dialogVisibility && !confirmationPromptVisibility && !moveToConfirmation"
        class="pb-0 px-0 top-[9.5rem] w-full bg-midnight-creme-brulee text-white z-1 md:hidden"
      >
        <div class="flex flex-col gap-1 pt-20 px-8 pb-16 rounded-xl">
          <slot></slot>
        </div>
        <footer class="bg-midnight-blue p-10 flex items-center justify-between">
          <span class="text-input-disabled-border hover:cursor-pointer" @click="tryClose">{{
            $t('profile.form.actions.cancel')
          }}</span>
          <ActionButton type="primary" @click="toggleConfirmationPromptVisibility">{{
            editText
          }}</ActionButton>
        </footer>
      </dialog>
      <div
        v-if="dialogVisibility && confirmationPromptVisibility"
        class="fixed top-0 left-0 h-screen w-screen z-10 md:hidden opacity-70"
        :class="shadowClass"
      ></div>
      <dialog
        open
        v-if="dialogVisibility && confirmationPromptVisibility"
        class="fixed z-10 h-screen bg-dashboard-gradient px-0 py-0 top-[9.5rem] w-full text-white md:hidden"
      >
        <div class="mx-auto bg-confirmation-prompt-gradient rounded-lg backdrop-blur-xl w-[90%]">
          <div class="pb-9 pt-16">
            <p class="text-center px-9">{{ $t('profile.are_you_sure_to_make_changes') }}</p>
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
    </div>
  </teleport>
</template>
